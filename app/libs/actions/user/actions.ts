"use server";
import { sql } from "@vercel/postgres";

import { revalidatePath } from "next/cache";
import { put } from "@vercel/blob";

import { AddPostState, Comment, Comments, ReactionType } from "./types";
import {
  Reaction,
  ReactionGroup,
  StoryMedia,
  User,
} from "../../data/user/types";

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

export async function commentAction(
  user: User,
  postId: string,
  comment: string
) {
  try {
    const insertComments =
      await sql<Comment>`INSERT INTO ucomments (postid, userid, comment) VALUES (${postId}, ${user.userid}, ${comment}) ON CONFLICT (commentid) DO NOTHING RETURNING *
`;

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

export async function LikeAction(
  postId: string,
  userId: string,
  reactionType: string
) {
  try {
    const likeCountForApost = await sql<ReactionType>`
  SELECT * FROM uposts JOIN ureactions ON uposts.postid = ureactions.postid JOIN users ON ureactions.userid = users.userid WHERE uposts.postid = ${postId} AND users.userid = ${userId}`;
    let reactionid;
    console.log("Length", likeCountForApost.rows.length);
    if (likeCountForApost.rows.length === 0) {
      const LikeApost =
        await sql`INSERT INTO ureactions (postid, userid, reactiontype) VALUES (${postId}, ${userId}, ${reactionType}) ON CONFLICT (reactionid) DO NOTHING RETURNING reactionid`;
      const updatedReactionCount = sql<Reaction>`SELECT COUNT(uposts.postid) as reactions FROM uposts JOIN ureactions ON uposts.postid = ureactions.postid WHERE uposts.postid = ${postId}`;
      const updatedReactionGroup = sql<ReactionGroup>`SELECT COUNT(uposts.postid) as count, ureactions.reactiontype FROM uposts JOIN ureactions ON uposts.postid = ureactions.postid WHERE uposts.postid = ${postId} GROUP BY ureactions.reactiontype`;
      const updatedReactedBy = sql<ReactionType>`SELECT ureactions.reactiontype, users.fname, users.lname FROM uposts JOIN ureactions ON uposts.postid = ureactions.postid JOIN users ON users.userid = ureactions.userid WHERE uposts.postid = ${postId} AND users.userid = ${userId}`;

      reactionid = LikeApost.rows[0].reactionid;
      console.log("INSERTED", LikeApost);
      return {
        isReacted: true,
        reactionType: (await updatedReactedBy).rows[0].reactiontype,
        reactor: `${(await updatedReactedBy).rows[0]?.fname} ${
          (await updatedReactedBy).rows[0]?.lname
        }`,
        reactions: (await updatedReactionCount).rows[0].reactions,
        reactionGroup: (await updatedReactionGroup).rows,
      };
    } else {
      await sql`DELETE FROM ureactions WHERE reactionid = ${reactionid} AND postid = ${postId} AND userid = ${userId}`;
      const reactionGroup = sql<ReactionGroup>`SELECT COUNT(uposts.postid) as count, ureactions.reactiontype FROM uposts JOIN ureactions ON uposts.postid = ureactions.postid WHERE uposts.postid = ${postId} GROUP BY ureactions.reactiontype`;
      const reactions = sql<Reaction>`SELECT COUNT(uposts.postid) as reactions FROM uposts JOIN ureactions ON uposts.postid = ureactions.postid WHERE uposts.postid = ${postId}`;

      console.log("DELETED");
      return {
        isReacted: false,
        reactionType: "",
        reactor: "",
        reactions: (await reactions).rows[0].reactions,
        reactionGroup: (await reactionGroup).rows,
      };
    }
  } catch (error) {
    console.error(`Error in fetching the database ${error}`);
    return {
      isReacted: false,
      reactionType: "",
      reactor: "",
      reactions: 0,
      reactionGroup: [],
    };
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
