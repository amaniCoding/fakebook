import { ReactionGroup } from "@/app/types/db/query/media";
import { sql } from "@vercel/postgres";
export async function groupCommentReactions(postId: string, commentId: string) {
  const query =
    await sql<ReactionGroup>`SELECT COUNT(uposts.postid) as count, ucommentreactions.reactiontype FROM uposts JOIN ucomments ON uposts.postid = ucomments.postid JOIN ucommentreactions ON ucommentreactions.commentid = ucomments.commentid WHERE ucomments.commentid = ${commentId} AND uposts.postid = ${postId}`;
  const rows = query.rows.map((group) => {
    return {
      reactionType: group.reactiontype,
      count: group.count,
    };
  });
  return rows;
}

export async function countCommentReactions(postId: string, commentId: string) {
  const query =
    await sql`SELECT * FROM uposts JOIN ucomments ON uposts.postid = ucomments.postid JOIN ucommentreactions ON ucommentreactions.commentid = ucomments.commentid WHERE ucomments.commentid = ${commentId} AND uposts.postid = ${postId}`;
  return query.rowCount;
}

export async function countCommentReplies(postId: string, commentId: string) {
  const query =
    await sql`SELECT * FROM uposts JOIN ucomments ON uposts.postid = ucomments.postid JOIN ucommentreplies ON ucommentreplies.commentid = ucomments.commentid WHERE ucomments.commentid = ${commentId} AND uposts.postid = ${postId}`;
  return query.rowCount;
}

export async function getCommentReplies(postId: string, commentId: string) {
  const query =
    await sql`SELECT * FROM uposts JOIN ucomments ON uposts.postid = ucomments.postid JOIN ucommentreplies ON ucommentreplies.commentid = ucomments.commentid WHERE ucomments.commentid = ${commentId} AND uposts.postid = ${postId}`;
  return query.rows[0].replyid;
}

export async function getCommentReactionInfo(
  postId: string,
  commentId: string
) {
  const groupedReactions = await groupCommentReactions(postId, commentId);
  const data = groupedReactions.map((group) => {
    return {
      reactionType: group.reactionType,
      loading: true,
      page: 1,
      rowCount: 0,
    };
  });

  return data;
}
