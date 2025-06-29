"use server";
import { sql } from "@vercel/postgres";

import { put } from "@vercel/blob";

import { Comment } from "@/app/types/db/query/post";
import { User } from "@/app/types/db/query/user";
import {
  firstReactor,
  groupReactions,
  isReacted,
  reactPost,
  reReactPost,
  totalReactions,
  unReactPost,
} from "../utils/post";
import { fetchNewPost, fetchPosts, fetchPostsCount } from "../data/post";
import { LoggedInUser } from "@/app/config/loggedinuser";
import { AddPostState } from "@/app/types/action/user/post";
import { UserReaction } from "@/app/types/db/query/reaction";
import {
  countCommentReactions,
  countCommentReplies,
  getCommentReactionInfo,
  getCommentReplies,
  groupCommentReactions,
} from "../utils/post/comment/comment";
import {
  countReplyReactions,
  groupReplyReactions,
} from "../utils/post/comment/reply/reply";
export async function createPost(
  _prevState: AddPostState | undefined,
  formData: FormData
) {
  const medias: File[] = formData.getAll("photos") as File[];
  const post = formData.get("post") as string;
  const photoUrls: { url: string; type: string }[] = [];
  if (medias && medias.length > 0) {
    await Promise.all(
      medias.map(async (media) => {
        const name = media.name;
        const type = media.type;
        const file = media;

        try {
          const blob = await put(name, file, {
            access: "public",
            addRandomSuffix: true,
          });

          const photoUrl = blob.url;
          const mediaData = {
            url: photoUrl,
            type: type,
          };
          photoUrls.push(mediaData);
          return photoUrls;
        } catch {}
      })
    );
  }

  try {
    const InsertedPost =
      await sql`INSERT INTO uposts (posttype, userid, post) VALUES ('userpost', '7df4d265-83f8-4ea0-86a2-0e8e7088f9a5', ${post}) ON CONFLICT (postid) DO NOTHING RETURNING *;
      `;

    const postId = InsertedPost.rows[0].postid;
    if (photoUrls && photoUrls.length > 0) {
      await Promise.all(
        photoUrls.map((url) => {
          return sql`INSERT INTO umedias (postid, media, type) VALUES (${postId}, ${url.url}, ${url.type}) ON CONFLICT (mediaid) DO NOTHING`;
        })
      );
    }

    const updatedPosts = await fetchNewPost(LoggedInUser.userid, postId);
    if (updatedPosts) {
      return {
        isSuccessfull: true,
        post: updatedPosts[0],
      };
    }
  } catch (error) {
    console.error("Error while trying to upload a file\n", error);
  }
}

export async function getComments(postId: string, page: number) {
  const offset = (page - 1) * 5;
  try {
    const commentsCount = sql<Comment>`SELECT * FROM uposts JOIN ucomments ON uposts.postid = ucomments.postid JOIN users ON ucomments.userid = users.userid WHERE uposts.postid = ${postId} ORDER BY ucomments.date ASC`;
    const comments = sql<Comment>`SELECT * FROM uposts JOIN ucomments ON uposts.postid = ucomments.postid JOIN users ON ucomments.userid = users.userid WHERE uposts.postid = ${postId} ORDER BY ucomments.date ASC LIMIT 5 OFFSET ${offset}`;

    const [_commentsCount, _comments] = await Promise.all([
      commentsCount,
      comments,
    ]);
    const commentsData = await Promise.all(
      _comments.rows.map(async (comment) => {
        const replyid = await getCommentReplies(postId, comment.commentid);
        const [
          rxnsCount,
          repliesCount,
          groupedRxns,
          reactionInfo,
          replyReactionsInfo,
          replyRxnsCount,
          groupReplyRxns,
        ] = await Promise.all([
          countCommentReactions(postId, comment.commentid),
          countCommentReplies(postId, comment.commentid),
          groupCommentReactions(postId, comment.commentid),
          getCommentReactionInfo(postId, comment.commentid),
          groupReplyReactions(postId, comment.commentid, replyid),
          countReplyReactions(postId, comment.commentid, replyid),
          groupReplyReactions(postId, comment.commentid, replyid),
        ]);
        return {
          commentId: comment.commentid,
          comment: comment.comment,
          date: comment.date,
          user: {
            fName: comment.fname,
            lName: comment.lname,
            userId: comment.userid,
            profilePic: comment.profilepic,
          },
          media: {
            media: comment.media,
            type: comment.type,
          },
          reactionsCount: rxnsCount,
          repliesCount: repliesCount,
          groupedReactions: groupedRxns,
          reactionsInfo: reactionInfo,
          repliesInfo: {
            loading: true,
            page: 1,
            rowsCount: 0,
          },
          replyReactionsCount: replyRxnsCount,
          groupedReplyReactions: groupReplyRxns,
          replyReactionsInfo: replyReactionsInfo,
        };
      })
    );
    return {
      comments: commentsData,
      count: _commentsCount.rowCount,
    };
  } catch (error) {
    console.error(`error fetching comments ${error}`);
  }
}

export async function postComment(
  user: User,
  postId: string,
  comment: string,
  media?: string,
  type?: string
) {
  try {
    const insertComments =
      await sql<Comment>`INSERT INTO ucomments (postid, userid, comment, media, type) VALUES (${postId}, ${user.userid}, ${comment}, ${media}, ${type}) ON CONFLICT (commentid) DO NOTHING RETURNING *
`;
    return {
      comment: insertComments.rows[0].comment,
      commentId: insertComments.rows[0].commentid,
      date: insertComments.rows[0].date,
      user: {
        userId: user.userid,
        fName: user.fname,
        lName: user.lname,
        profilePic: user.profilepic,
      },
      media: {
        media: insertComments.rows[0].media,
        type: insertComments.rows[0].type,
      },
    };
  } catch (error) {
    console.error(`Error inserting comment ${error}`);
  }
}

export async function react(
  postId: string,
  userId: string,
  reactionType: string
) {
  try {
    if (!(await isReacted(postId, userId)).isReacted) {
      await reactPost(postId, userId, reactionType);
    } else {
      await unReactPost(postId, userId);
    }
    const [
      _isPostReactedByLoggedInUser,
      _totalPostReactions,
      _groupPostReactions,
      _firstReactorInfo,
    ] = await Promise.all([
      isReacted(postId, userId),
      totalReactions(postId),
      groupReactions(postId),
      firstReactor(postId),
    ]);

    return {
      isReacted: _isPostReactedByLoggedInUser.isReacted,
      reactionType: _isPostReactedByLoggedInUser.reactionType,
      firstReactorInfo: _firstReactorInfo,
      reactions: _totalPostReactions,
      reactionGroup: _groupPostReactions,
    };
  } catch (error) {
    console.error(`Error in fetching the database ${error}`);
  }
}

export async function reReact(
  postId: string,
  userId: string,
  reactionType: string
) {
  try {
    if (!(await isReacted(postId, userId)).isReacted) {
      await reactPost(postId, userId, reactionType);
    } else {
      await reReactPost(postId, userId, reactionType);
    }

    const [
      _isPostReactedByLoggedInUser,
      _totalPostReactions,
      _groupPostReactions,
      _firstReactorInfo,
    ] = await Promise.all([
      isReacted(postId, userId),
      totalReactions(postId),
      groupReactions(postId),
      firstReactor(postId),
    ]);

    return {
      isReacted: _isPostReactedByLoggedInUser.isReacted,
      reactionType: _isPostReactedByLoggedInUser.reactionType,
      firstReactorInfo: _firstReactorInfo,
      reactions: _totalPostReactions,
      reactionGroup: _groupPostReactions,
    };
  } catch (error) {
    console.error(`Error in updating post reactions ${error}`);
  }
}

export async function fetchFeedCount() {
  const feeds = await fetchPostsCount();
  return feeds;
}

export async function fetchFeeds(userid: string, page: number) {
  const feeds = await fetchPosts(userid, page);
  return feeds;
}

export async function getReactors(
  postId: string,
  reactionType: string,
  page: number
) {
  const offest = (page - 1) * 7;
  const query =
    await sql<UserReaction>`SELECT * FROM uposts JOIN ureactions ON uposts.postid = ureactions.postid JOIN users ON ureactions.userid = users.userid WHERE uposts.postid = ${postId} AND ureactions.reactiontype = ${reactionType} LIMIT 7 OFFSET ${offest}`;
  const reactors = query.rows.map((user) => {
    return {
      user: {
        userId: user.userid,
        fName: user.fname,
        lName: user.lname,
        profilePic: user.profilepic,
      },
      reactionType: user.reactiontype,
    };
  });
  return reactors;
}

export async function getMediaReactors(
  postId: string,
  mediaId: string,
  reactionType: string,
  page: number
) {
  const offest = (page - 1) * 7;
  const query =
    await sql<UserReaction>`SELECT * FROM uposts JOIN umedias ON uposts.postid = umedias.postid JOIN umediareactions ON umediareactions.mediaid = umedias.mediaid JOIN users ON umediareactions.userid = users.userid WHERE uposts.postid = ${postId} AND umedias.mediaid = ${mediaId} AND umediareactions.reactiontype = ${reactionType} LIMIT 7 OFFSET ${offest}`;
  const reactors = query.rows.map((user) => {
    return {
      user: {
        userId: user.userid,
        fName: user.fname,
        lName: user.lname,
        profilePic: user.profilepic,
      },
      reactionType: user.reactiontype,
    };
  });
  return reactors;
}
