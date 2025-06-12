/* eslint-disable @typescript-eslint/no-unused-vars */
"use server";
import { sql } from "@vercel/postgres";

import { revalidatePath } from "next/cache";
import { put } from "@vercel/blob";

import { AddPostState, Comment, Comments, PostReactionInfo } from "./types";
import {
  Reaction,
  ReactionGroup,
  StoryMedia,
  User,
} from "../../data/user/types";

export async function fetchPhotoComments(mediaId: string, postId: string) {
  try {
    const mediaComments =
      await sql<Comments>`SELECT * FROM uposts JOIN umedias ON uposts.postid = umedias.postid JOIN umediacomments ON umediacomments.mediaid = umedias.mediaid WHERE mediaid = ${mediaId} AND postid = ${postId}`;
    return {
      comments: mediaComments.rows.map((comment) => {
        return {
          commentid: comment.commentid,
          comment: comment.comment,
          date: comment.date,
          user: {
            fname: comment.fname,
            lname: comment.lname,
            userid: comment.userid,
            profilepic: comment.profilepic,
          },
        };
      }),
    };
  } catch (error) {
    console.error(`Error while fetch photo comments ${error}`);
    return {
      comments: [],
    };
  }
}

export async function fetchCommentsAction(postId: string) {
  try {
    const comments =
      await sql<Comments>`SELECT * FROM uposts JOIN ucomments ON uposts.postid = ucomments.postid JOIN users ON ucomments.userid = users.userid WHERE uposts.postid = ${postId} ORDER BY ucomments.date DESC`;
    return {
      loading: false,
      comments: comments.rows.map((comment) => {
        return {
          commentid: comment.commentid,
          comment: comment.comment,
          date: comment.date,
          user: {
            fname: comment.fname,
            lname: comment.lname,
            userid: comment.userid,
            profilepic: comment.profilepic,
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

export async function MediaCommentAction(
  user: User,
  postId: string,
  mediaId: string,
  comment: string
) {
  try {
    const insertComments =
      await sql<Comment>`INSERT INTO umediacomments (postid, userid, mediaid, comment) VALUES (${postId}, ${user.userid}, ${mediaId}, ${comment}) ON CONFLICT (commentid) DO NOTHING RETURNING *
`;
    revalidatePath(`/${postId}/${mediaId}`);
  } catch (error) {
    console.error(`Error inserting comment ${error}`);
  }
}

export async function commentAction(
  user: User,
  postId: string,
  comment: string
) {
  try {
    const insertComments =
      await sql<Comment>`INSERT INTO ucomments (postid, userid, comment) VALUES (${postId}, ${user.userid}, ${comment}) ON CONFLICT (commentid) DO NOTHING RETURNING *
`;
    revalidatePath("/");
    return {
      loading: false,
      comment: {
        comment: insertComments.rows[0].comment,
        commentid: insertComments.rows[0].commentid,
        date: insertComments.rows[0].date,
        user: user,
      },
    };
  } catch (error) {
    console.error(`Error inserting comment ${error}`);
    return {
      loading: false,
      comment: {
        commentid: "",
        comment: "",
        date: "",
        user: user,
      },
    };
  }
}

async function groupPostReactions(postId: string) {
  const rows =
    await sql<ReactionGroup>`SELECT COUNT(uposts.postid) as count, ureactions.reactiontype FROM uposts JOIN ureactions ON uposts.postid = ureactions.postid WHERE uposts.postid = ${postId} GROUP BY ureactions.reactiontype`;
  return rows;
}

async function totalPostReactions(postId: string) {
  const rows =
    await sql<Reaction>`SELECT COUNT(uposts.postid) as reactions FROM uposts JOIN ureactions ON uposts.postid = ureactions.postid WHERE uposts.postid = ${postId}`;
  return rows;
}

async function reactionInfo(postId: string, userId: string) {
  const rows =
    await sql<PostReactionInfo>`SELECT ureactions.reactionid ureactions.reactiontype, users.fname, users.lname FROM uposts JOIN ureactions ON uposts.postid = ureactions.postid JOIN users ON users.userid = ureactions.userid WHERE uposts.postid = ${postId} AND users.userid = ${userId}`;
  return rows;
}

export async function UpdateMediaReactionAction(
  postId: string,
  userId: string,
  reactionType: string,
  mediaId: string
) {
  try {
    const isReactedByUser = await sql<PostReactionInfo>`
  SELECT ureactions.reactionid, ureactions.reactiontype, users.fname, users.lname FROM uposts JOIN medias ON uposts.postid = umedias.postid JOIN umediareactions ON umediareactions.mediaid = umedias.mediaid JOIN users ON umediareactions.userid = users.userid WHERE uposts.postid = ${postId} AND mediaid = ${mediaId} AND users.userid = ${userId}`;
    if (isReactedByUser.rows.length === 0) {
      await sql`INSERT INTO umediareactions (postid, userid, mediaid, reactiontype) VALUES (${postId}, ${userId}, ${mediaId}, ${reactionType}) ON CONFLICT (reactionid) DO NOTHING`;
      revalidatePath(`/${postId}/${mediaId}`);
    } else {
      await sql`UPDATE ureactions SET umediareactions = ${reactionType} WHERE postid = ${postId} AND userid = ${userId} AND mediaid = ${mediaId}`;
      revalidatePath(`/${postId}/${mediaId}`);
    }
  } catch (error) {
    console.error(`Error in fetching the database ${error}`);
  }
}

export async function UpdateReaction(
  postId: string,
  userId: string,
  reactionType: string
) {
  try {
    const isReactedByUser = await sql<PostReactionInfo>`
  SELECT ureactions.reactionid, ureactions.reactiontype, users.fname, users.lname FROM uposts JOIN ureactions ON uposts.postid = ureactions.postid JOIN users ON ureactions.userid = users.userid WHERE uposts.postid = ${postId} AND users.userid = ${userId}`;
    if (isReactedByUser.rows.length === 0) {
      await sql`INSERT INTO ureactions (postid, userid, reactiontype) VALUES (${postId}, ${userId}, ${reactionType}) ON CONFLICT (reactionid) DO NOTHING`;
      revalidatePath("/");
    } else {
      await sql`UPDATE ureactions SET reactiontype = ${reactionType} WHERE postid = ${postId} AND userid = ${userId}`;
      revalidatePath("/");
    }
  } catch (error) {
    console.error(`Error in fetching the database ${error}`);
  }
}

export async function likeMediaAction(
  postId: string,
  userId: string,
  mediaId: string,
  reactionType: string
) {
  try {
    const isReactedByUser = await sql<PostReactionInfo>`
  SELECT ureactions.reactionid, ureactions.reactiontype, users.fname, users.lname FROM uposts JOIN medias ON uposts.postid = umedias.postid JOIN umediareactions ON umediareactions.mediaid = umedias.mediaid JOIN users ON umediareactions.userid = users.userid WHERE uposts.postid = ${postId} AND mediaid = ${mediaId} AND users.userid = ${userId}`;
    if (isReactedByUser.rows.length === 0) {
      await sql`INSERT INTO umediareactions (postid, userid, mediaid, reactiontype) VALUES (${postId}, ${userId}, ${mediaId}, ${reactionType}) ON CONFLICT (reactionid) DO NOTHING`;
      revalidatePath(`/${postId}/${mediaId}`);
    } else {
      await sql`DELETE FROM ureactions WHERE postid = ${postId} AND mediaid = ${mediaId} AND userid = ${userId}`;
      revalidatePath(`/${postId}/${mediaId}`);
    }
  } catch (error) {
    console.error(`Error in fetching the database ${error}`);
  }
}

export async function LikeAction(
  postId: string,
  userId: string,
  reactionType: string
) {
  try {
    const isReactedByUser = await sql<PostReactionInfo>`
  SELECT ureactions.reactionid, ureactions.reactiontype, users.fname, users.lname FROM uposts JOIN ureactions ON uposts.postid = ureactions.postid JOIN users ON ureactions.userid = users.userid WHERE uposts.postid = ${postId} AND users.userid = ${userId}`;
    if (isReactedByUser.rows.length === 0) {
      await sql`INSERT INTO ureactions (postid, userid, reactiontype) VALUES (${postId}, ${userId}, ${reactionType}) ON CONFLICT (reactionid) DO NOTHING`;
      revalidatePath("/");
    } else {
      await sql`DELETE FROM ureactions WHERE postid = ${postId} AND userid = ${userId}`;
      revalidatePath("/");
    }
  } catch (error) {
    console.error(`Error in fetching the database ${error}`);
  }
}

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

    revalidatePath("/");
    return {
      isSuccessfull: true,
    };
  } catch (error) {
    console.error("Error while trying to upload a file\n", error);
    return {
      isSuccessfull: true,
    };
  }
}

export async function fetchStoryPhotos(storyId: string | undefined) {
  try {
    const data =
      await sql<StoryMedia>`SELECT ustorymedias.media, ustorymedias.type, users.fname, users.lname, users.profilepic FROM ustories JOIN users ON ustories.userid = users.userid JOIN ustorymedias ON ustories.storyid = ustorymedias.storyid WHERE ustories.storyid = ${storyId} ORDER BY ustorymedias.date DESC`;
    return data.rows;
  } catch (error) {
    console.log("Database error", error);
    throw new Error("Faild to fetch dev data");
  }
}
