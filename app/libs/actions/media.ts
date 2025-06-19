"use server";
import { sql } from "@vercel/postgres";

import { Comment } from "@/app/types/db/query/comment";
import { MComment } from "@/app/types/db/query/media";
import { User } from "@/app/types/db/query/user";
import {
  isMediaReacted,
  mfirstReactor,
  mgroupReactions,
  mtotalReactions,
  reactMedia,
  reReactMedia,
  unReactMedia,
} from "../utils/media";

export async function mReact(
  postId: string,
  userId: string,
  mediaId: string,
  reactionType: string
) {
  try {
    if (!(await isMediaReacted(postId, userId, mediaId)).isReacted) {
      await reactMedia(postId, userId, mediaId, reactionType);
    } else {
      await unReactMedia(postId, userId, mediaId);
    }

    const [
      _isPostMediaReactedByLoggedInUser,
      _totalMediaPostReactions,
      _groupMediaPostReactions,
      _firstMeidaReactorInfo,
    ] = await Promise.all([
      isMediaReacted(postId, userId, mediaId),
      mtotalReactions(postId, mediaId),

      mgroupReactions(postId, mediaId),
      mfirstReactor(postId, mediaId),
    ]);

    return {
      isReacted: _isPostMediaReactedByLoggedInUser.isReacted,
      reactionType: _isPostMediaReactedByLoggedInUser.reactionType,
      firstReactorInfo: _firstMeidaReactorInfo,
      reactions: _totalMediaPostReactions,
      reactionGroup: _groupMediaPostReactions,
    };
  } catch (error) {
    console.error(`Error in fetching the database ${error}`);
  }
}

export async function mReReact(
  postId: string,
  userId: string,
  mediaId: string,
  reactionType: string
) {
  try {
    if (!(await isMediaReacted(postId, userId, mediaId)).isReacted) {
      await reactMedia(postId, userId, mediaId, reactionType);
    } else {
      await reReactMedia(postId, userId, mediaId, reactionType);
    }

    const [
      _isPostMediaReactedByLoggedInUser,
      _totalMediaPostReactions,
      _groupMediaPostReactions,
      _firstMeidaReactorInfo,
    ] = await Promise.all([
      isMediaReacted(postId, userId, mediaId),
      mtotalReactions(postId, mediaId),
      mgroupReactions(postId, mediaId),
      mfirstReactor(postId, mediaId),
    ]);

    return {
      isReacted: _isPostMediaReactedByLoggedInUser.isReacted,
      reactionType: _isPostMediaReactedByLoggedInUser.reactionType,
      firstReactorInfo: _firstMeidaReactorInfo,
      reactions: _totalMediaPostReactions,
      reactionGroup: _groupMediaPostReactions,
    };
  } catch (error) {
    console.error(`Error updating media reaction ${error}`);
  }
}

export async function mComment(
  loggedinuser: User,
  postId: string,
  mediaId: string,
  comment: string
) {
  const data =
    await sql<Comment>`INSERT INTO umediacomments (postid, userid, mediaid, comment) VALUES (${postId}, ${loggedinuser.userid}, ${mediaId}, ${comment}) ON CONFLICT (commentid) DO NOTHING RETURNING *
`;
  return {
    commentId: data.rows[0].commentid,
    comment: data.rows[0].comment,
    date: data.rows[0].date,
    user: {
      userId: loggedinuser.userid,
      fName: loggedinuser.fname,
      lName: loggedinuser.lname,
      profilePic: loggedinuser.profilepic,
    },
  };
}

export async function mComments(postId: string, mediaId: string, page: number) {
  const offset = (page - 1) * 5;
  const comments =
    await sql<MComment>`SELECT * FROM uposts JOIN umedias ON uposts.postid = umedias.postid JOIN umediacomments ON umediacomments.mediaid = umedias.mediaid JOIN users ON users.userid = umediacomments.userid WHERE uposts.postid = ${postId} AND umedias.mediaid = ${mediaId} ORDER BY umediacomments.date DESC LIMIT 5 OFFSET ${offset}`;
  const mediaCommentsData = comments.rows.map((comment) => {
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
  });
  return mediaCommentsData;
}

// export async function comment(
//   LoggedInUser: User,
//   postId: string,
//   mediaId: string,
//   comment: string
// ) {
//   try {
//     return await insertMediaComment(LoggedInUser, postId, mediaId, comment);
//   } catch (error) {
//     console.error(`Error while inserting media comment`);
//   }
// }
