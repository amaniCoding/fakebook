/* eslint-disable @typescript-eslint/no-unused-vars */
"use server";
import { sql } from "@vercel/postgres";

import { revalidatePath } from "next/cache";
import { put } from "@vercel/blob";

import { AddPostState, Comment, Comments, PostReactionInfo } from "./types";
import {
  FirstMediaReactor,
  MediaComments,
  MediaCommentsCount,
  MediaReactionCount,
  MediaReactionGroup,
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
  const data =
    await sql<ReactionGroup>`SELECT COUNT(uposts.postid) as count, ureactions.reactiontype FROM uposts JOIN ureactions ON uposts.postid = ureactions.postid WHERE uposts.postid = ${postId} GROUP BY ureactions.reactiontype`;
  return data.rows;
}

async function totalPostReactions(postId: string) {
  const data =
    await sql<Reaction>`SELECT COUNT(uposts.postid) as reactions FROM uposts JOIN ureactions ON uposts.postid = ureactions.postid WHERE uposts.postid = ${postId}`;
  if (data.rows.length > 0) {
    return data.rows[0].reactions;
  } else {
    return "";
  }
}

export async function fetchMediaReactionsInGroup(
  postId: string,
  mediaId: string
) {
  const data =
    await sql<MediaReactionGroup>`SELECT COUNT(reactionid) as count, umediareactions.reactiontype FROM uposts JOIN umedias ON uposts.postid = umedias.postid JOIN umediareactions ON umediareactions.mediaid = umedias.mediaid WHERE uposts.postid = ${postId} AND umedias.mediaid = ${mediaId} GROUP BY umediareactions.reactiontype`;
  return data.rows;
}

export async function fetchMediaCommentsCount(postId: string, mediaId: string) {
  const data =
    await sql<MediaCommentsCount>`SELECT COUNT(commentid) as count FROM uposts JOIN umedias ON uposts.postid = umedias.postid JOIN umediacomments ON umediacomments.mediaid = umedias.mediaid WHERE uposts.postid = ${postId} AND umedias.mediaid = ${mediaId}`;
  if (data.rows.length > 0) {
    return data.rows[0].count;
  } else {
    return "";
  }
}

export async function fetchMediaComments(postId: string, mediaId: string) {
  const data =
    await sql<MediaComments>`SELECT * FROM uposts JOIN umedias ON uposts.postid = umedias.postid JOIN umediacomments ON umediacomments.mediaid = umedias.mediaid JOIN users ON users.userid = umediacomments.userid WHERE uposts.postid = ${postId} AND umedias.mediaid = ${mediaId}`;
  return data.rows;
}

export async function getMediaReactionCount(postId: string, mediaId: string) {
  const data =
    await sql<MediaReactionCount>`SELECT COUNT(reactionid) as count FROM uposts JOIN umedias ON uposts.postid = umedias.postid JOIN umediareactions ON umediareactions.mediaid = umedias.mediaid WHERE uposts.postid = ${postId} AND umedias.mediaid = ${mediaId}`;
  return data.rows[0].count;
}

export async function getFirstMediaReactor(postId: string, mediaId: string) {
  const data =
    await sql<FirstMediaReactor>`SELECT users.fname, users.lname, users.userid FROM uposts JOIN umedias ON uposts.postid = umedias.postid JOIN umediareactions ON umediareactions.mediaid = umedias.mediaid JOIN users ON users.userid = umediareactions.userid WHERE uposts.postid = ${postId} AND umedias.mediaid = ${mediaId}`;
  if (data.rows.length === 1) {
    return {
      reactionId: data.rows[0].reactionid,
      reactionType: data.rows[0].reactiontype,
      reactor: `${data.rows[0].fname} ${data.rows[0].lname}`,
    };
  } else {
    return {
      reactionId: "",
      reactionType: "",
      reactor: "",
    };
  }
}

async function firstReactorInfo(postId: string) {
  const data =
    await sql<PostReactionInfo>`SELECT ureactions.reactionid ureactions.reactiontype, users.fname, users.lname FROM uposts JOIN ureactions ON uposts.postid = ureactions.postid JOIN users ON users.userid = ureactions.userid WHERE uposts.postid = ${postId}`;
  if (data.rows.length === 1) {
    return {
      reactionId: data.rows[0].reactionid,
      reactionType: data.rows[0].reactiontype,
      reactor: `${data.rows[0].fname} ${data.rows[0].lname}`,
    };
  } else {
    return {
      reactionId: "",
      reactionType: "",
      reactor: "",
    };
  }
}

async function updatePostReactions(
  postId: string,
  userId: string,
  reactionType: string
) {
  return await sql`UPDATE ureactions SET reactiontype = ${reactionType} WHERE postid = ${postId} AND userid = ${userId}`;
}

async function insertPostReactions(
  postId: string,
  userId: string,
  reactionType: string
) {
  return await sql`INSERT INTO ureactions (postid, userid, reactiontype) VALUES (${postId}, ${userId}, ${reactionType}) ON CONFLICT (reactionid) DO NOTHING`;
}
async function reactPostMedia(
  postId: string,
  userId: string,
  mediaId: string,
  reactionType: string
) {
  return await sql`INSERT INTO umediareactions (postid, userid, mediaid, reactiontype) VALUES (${postId}, ${userId}, ${mediaId}, ${reactionType}) ON CONFLICT (reactionid) DO NOTHING`;
}
async function unReactPostMedia(
  postId: string,
  userId: string,
  mediaId: string
) {
  return await sql`DELETE FROM umediareactions WHERE postid = ${postId} AND mediaid = ${mediaId} AND userid = ${userId}`;
}

async function isPostMediaIsReactedByLoggedUser(
  postId: string,
  userId: string,
  mediaId: string
) {
  const data = await sql<PostReactionInfo>`
  SELECT ureactions.reactionid, ureactions.reactiontype, users.fname, users.lname FROM uposts JOIN medias ON uposts.postid = umedias.postid JOIN umediareactions ON umediareactions.mediaid = umedias.mediaid JOIN users ON umediareactions.userid = users.userid WHERE uposts.postid = ${postId} AND mediaid = ${mediaId} AND users.userid = ${userId}`;
  if (data.rows.length > 0) {
    return {
      isReacted: true,
      reactionType: data.rows[0].reactiontype,
      reactor: `${data.rows[0].fname} ${data.rows[0].lname}`,
    };
  } else {
    return {
      isReacted: false,
      reactionType: "",
      reactor: "",
    };
  }
}

async function deletePostReactions(postId: string, userId: string) {
  return await sql`DELETE FROM ureactions WHERE postid = ${postId} AND userid = ${userId}`;
}

async function isPostReactedByLoggedInUser(postId: string, userId: string) {
  const data = await sql<PostReactionInfo>`
  SELECT ureactions.reactionid, ureactions.reactiontype, users.fname, users.lname FROM uposts JOIN ureactions ON uposts.postid = ureactions.postid JOIN users ON ureactions.userid = users.userid WHERE uposts.postid = ${postId} AND users.userid = ${userId}`;
  if (data.rows.length > 0) {
    return {
      isReacted: true,
      reactionType: data.rows[0].reactiontype,
      reactor: `${data.rows[0].fname} ${data.rows[0].lname}`,
    };
  } else {
    return {
      isReacted: false,
      reactionType: "",
      reactor: "",
    };
  }
}

export async function UpdateMediaReactionAction(
  postId: string,
  userId: string,
  mediaId: string,
  reactionType: string
) {
  try {
    if (
      (await isPostMediaIsReactedByLoggedUser(postId, userId, mediaId))
        .isReacted
    ) {
      reactPostMedia(postId, userId, mediaId, reactionType);
    } else {
      unReactPostMedia(postId, userId, mediaId);
    }

    const [
      _isPostMediaReactedByLoggedInUser,
      _totalMediaPostReactions,
      _groupMediaPostReactions,
      _firstMeidaReactorInfo,
    ] = await Promise.all([
      isPostMediaIsReactedByLoggedUser(postId, userId, mediaId),
      getMediaReactionCount(postId, mediaId),
      fetchMediaReactionsInGroup(postId, mediaId),
      getFirstMediaReactor(postId, mediaId),
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

export async function UpdateReaction(
  postId: string,
  userId: string,
  reactionType: string
) {
  try {
    if (await isPostReactedByLoggedInUser(postId, userId)) {
      await insertPostReactions(postId, userId, reactionType);
    } else {
      await updatePostReactions(postId, userId, reactionType);
    }

    const [
      _isPostReactedByLoggedInUser,
      _totalPostReactions,
      _groupPostReactions,
      _firstReactorInfo,
    ] = await Promise.all([
      isPostReactedByLoggedInUser(postId, userId),
      totalPostReactions(postId),
      groupPostReactions(postId),
      firstReactorInfo(postId),
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

export async function likeMediaAction(
  postId: string,
  userId: string,
  mediaId: string,
  reactionType: string
) {
  try {
    if (
      (await isPostMediaIsReactedByLoggedUser(postId, userId, mediaId))
        .isReacted
    ) {
      await reactPostMedia(postId, userId, mediaId, reactionType);
    } else {
      await unReactPostMedia(postId, userId, mediaId);
    }

    const [
      _isPostMediaReactedByLoggedInUser,
      _totalMediaPostReactions,
      _groupMediaPostReactions,
      _firstMeidaReactorInfo,
    ] = await Promise.all([
      isPostMediaIsReactedByLoggedUser(postId, userId, mediaId),
      getMediaReactionCount(postId, mediaId),
      fetchMediaReactionsInGroup(postId, mediaId),
      getFirstMediaReactor(postId, mediaId),
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

export async function LikeAction(
  postId: string,
  userId: string,
  reactionType: string
) {
  try {
    if ((await isPostReactedByLoggedInUser(postId, userId)).isReacted) {
      await insertPostReactions(postId, userId, reactionType);
    } else {
      await deletePostReactions(postId, userId);
    }
    const [
      _isPostReactedByLoggedInUser,
      _totalPostReactions,
      _groupPostReactions,
      _firstReactorInfo,
    ] = await Promise.all([
      isPostReactedByLoggedInUser(postId, userId),
      totalPostReactions(postId),
      groupPostReactions(postId),
      firstReactorInfo(postId),
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
