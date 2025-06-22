"use server";
import { sql } from "@vercel/postgres";
import {
  CommentsCount,
  FirstReactor,
  ReactionCount,
  ReactionGroup,
} from "@/app/types/db/query/media";
import { ReactionInfo } from "@/app/types/db/query/reaction";
import { Comment } from "@/app/types/frontend/comment";

export async function mgroupReactions(postId: string, mediaId: string) {
  const data =
    await sql<ReactionGroup>`SELECT COUNT(reactionid) as count, umediareactions.reactiontype FROM uposts JOIN umedias ON uposts.postid = umedias.postid JOIN umediareactions ON umediareactions.mediaid = umedias.mediaid WHERE uposts.postid = ${postId} AND umedias.mediaid = ${mediaId} GROUP BY umediareactions.reactiontype`;
  return data.rows.map((group) => {
    return {
      reactionType: group.reactiontype,
      count: group.count,
    };
  });
}

export async function reactMedia(
  postId: string,
  userId: string,
  mediaId: string,
  reactionType: string
) {
  return await sql`INSERT INTO umediareactions (postid, userid, mediaid, reactiontype) VALUES (${postId}, ${userId}, ${mediaId}, ${reactionType}) ON CONFLICT (reactionid) DO NOTHING`;
}

export async function unReactMedia(
  postId: string,
  userId: string,
  mediaId: string
) {
  return await sql`DELETE FROM umediareactions WHERE postid = ${postId} AND mediaid = ${mediaId} AND userid = ${userId}`;
}

export async function reReactMedia(
  postId: string,
  userId: string,
  mediaId: string,
  reactionType: string
) {
  return await sql`UPDATE umediareactions SET reactiontype = ${reactionType} WHERE postid = ${postId} AND mediaid = ${mediaId} AND userid = ${userId}`;
}

export async function isMediaReacted(
  postId: string,
  userId: string,
  mediaId: string
) {
  const data = await sql<ReactionInfo>`
  SELECT umediareactions.reactionid, umediareactions.reactiontype, users.fname, users.lname FROM uposts JOIN umedias ON uposts.postid = umedias.postid JOIN umediareactions ON umediareactions.mediaid = umedias.mediaid JOIN users ON umediareactions.userid = users.userid WHERE uposts.postid = ${postId} AND umedias.mediaid = ${mediaId} AND users.userid = ${userId}`;
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

export async function mtotalComments(postId: string, mediaId: string) {
  const data =
    await sql<CommentsCount>`SELECT COUNT(commentid) as count FROM uposts JOIN umedias ON uposts.postid = umedias.postid JOIN umediacomments ON umediacomments.mediaid = umedias.mediaid WHERE uposts.postid = ${postId} AND umedias.mediaid = ${mediaId}`;
  if (data.rows.length > 0) {
    return data.rows[0].count;
  } else {
    return "";
  }
}

export async function mtotalReactions(postId: string, mediaId: string) {
  const data =
    await sql<ReactionCount>`SELECT COUNT(reactionid) as count FROM uposts JOIN umedias ON uposts.postid = umedias.postid JOIN umediareactions ON umediareactions.mediaid = umedias.mediaid WHERE uposts.postid = ${postId} AND umedias.mediaid = ${mediaId}`;
  return data.rows[0].count;
}

export async function mfirstReactor(postId: string, mediaId: string) {
  const data =
    await sql<FirstReactor>`SELECT users.fname, users.lname, users.userid FROM uposts JOIN umedias ON uposts.postid = umedias.postid JOIN umediareactions ON umediareactions.mediaid = umedias.mediaid JOIN users ON users.userid = umediareactions.userid WHERE uposts.postid = ${postId} AND umedias.mediaid = ${mediaId}`;
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

export async function mcomments(postId: string, mediaId: string) {
  const data =
    await sql<Comment>`SELECT * FROM uposts JOIN umedias ON uposts.postid = umedias.postid JOIN umediacomments ON umediacomments.mediaid = umedias.mediaid JOIN users ON users.userid = umediacomments.userid WHERE uposts.postid = ${postId} AND umedias.mediaid = ${mediaId}`;
  return data.rows;
}

export async function constructGroupReactionInfoForMedia(
  mediaId: string,
  postId: string,
  reaction: {
    reactionType: string;
    count: string;
  }
) {
  const query =
    await sql`SELECT * FROM uposts JOIN ureactions ON uposts.postid = ureactions.postid JOIN users ON ureactions.userid = users.userid WHERE postid = ${postId} and ureactions.reactiontype = ${reaction.reactionType}`;
  return {
    [reaction.reactionType]: {
      loading: true,
      page: 1,
      rowCount: query.rowCount,
      reactors: [],
      reactionType: reaction.reactionType,
    },
  };
}
