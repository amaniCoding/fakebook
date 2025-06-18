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
import { fetchNewPost, fetchPosts } from "../data/post";
import { LoggedInUser } from "@/app/config/loggedinuser";
import { AddPostState } from "@/app/types/action/user/post";
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

export async function getComments(postId: string) {
  try {
    const comments =
      await sql<Comment>`SELECT * FROM uposts JOIN ucomments ON uposts.postid = ucomments.postid JOIN users ON ucomments.userid = users.userid WHERE uposts.postid = ${postId} ORDER BY ucomments.date DESC`;
    return {
      loading: false,
      comments: comments.rows.map((comment) => {
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
        };
      }),
    };
  } catch (error) {
    console.error(`error fetching comments ${error}`);
    return {
      loading: false,
      comments: [],
    };
  }
}

export async function postComment(user: User, postId: string, comment: string) {
  try {
    const insertComments =
      await sql<Comment>`INSERT INTO ucomments (postid, userid, comment) VALUES (${postId}, ${user.userid}, ${comment}) ON CONFLICT (commentid) DO NOTHING RETURNING *
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

export async function fetchFeeds(userid: string, page: number) {
  const feeds = await fetchPosts(userid, page);
  return feeds;
}
