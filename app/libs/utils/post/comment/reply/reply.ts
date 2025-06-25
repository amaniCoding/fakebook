import { ReactionGroup } from "@/app/types/db/query/media";
import { sql } from "@vercel/postgres";
export async function groupReplyReactions(
  postId: string,
  commentId: string,
  replyId: string
) {
  const query =
    await sql<ReactionGroup>`SELECT COUNT(uposts.postid) as count, ureplyreactions.reactiontype FROM uposts JOIN ucomments ON uposts.postid = ucomments.postid JOIN ureplies ON ureplies.commentid = ucomments.commentid JOIN ureplyreactions ON ureplies.replyid = ureplyreactions.replyid JOIN users ON users.userid = ureplyreactions.userid  WHERE ucomments.commentid = ${commentId} AND uposts.postid = ${postId} AND ureplies.replyid = ${replyId}`;
  const rows = query.rows.map((group) => {
    return {
      reactionType: group.reactiontype,
      count: group.count,
    };
  });
  return rows;
}

export async function countCommentReactions(
  postId: string,
  commentId: string,
  replyId: string
) {
  const query =
    await sql`SELECT * FROM uposts JOIN ucomments ON uposts.postid = ucomments.postid JOIN ureplies ON ureplies.commentid = ucomments.commentid JOIN ureplyreactions ON ureplies.replyid = ureplyreactions.replyid JOIN users ON users.userid = ureplyreactions.userid  WHERE ucomments.commentid = ${commentId} AND uposts.postid = ${postId} AND ureplies.replyid = ${replyId}`;
  return query.rowCount;
}

export async function countCommentReplies(postId: string, commentId: string) {
  const query =
    await sql`SELECT * FROM uposts JOIN ucomments ON uposts.postid = ucomments.postid JOIN ucommentreplies ON ucommentreplies.commentid = ucomments.commentid WHERE ucomments.commentid = ${commentId} AND uposts.postid = ${postId}`;
  return query.rowCount;
}

export async function getCommentReactionInfo(
  postId: string,
  commentId: string,
  replyId: string
) {
  const groupedReactions = await groupReplyReactions(
    postId,
    commentId,
    replyId
  );
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
