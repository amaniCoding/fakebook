import { sql } from "@vercel/postgres";
import {
  Comment,
  GroupReaction,
  PostReactor,
  Reaction,
  ReactionInfo,
} from "@/app/types/db/query/post";
import { Media } from "@/app/types/db/query/media";
import { CommentsCount } from "@/app/types/db/query/post";
import {
  constructGroupReactionInfoForMedia,
  isMediaReacted,
  mfirstReactor,
  mgroupReactions,
  mtotalComments,
  mtotalReactions,
} from "./media";
import { LoggedInUser } from "@/app/config/loggedinuser";

export async function reReactPost(
  postId: string,
  userId: string,
  reactionType: string
) {
  return await sql`UPDATE ureactions SET reactiontype = ${reactionType} WHERE postid = ${postId} AND userid = ${userId}`;
}

export async function isReacted(postId: string, userId: string) {
  const data = await sql<ReactionInfo>`
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

export async function unReactPost(postId: string, userId: string) {
  return await sql`DELETE FROM ureactions WHERE postid = ${postId} AND userid = ${userId}`;
}

export async function firstReactor(postId: string) {
  const data =
    await sql<ReactionInfo>`SELECT ureactions.reactionid, ureactions.reactiontype, users.fname, users.lname FROM uposts JOIN ureactions ON uposts.postid = ureactions.postid JOIN users ON users.userid = ureactions.userid WHERE uposts.postid = ${postId}`;
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

export async function reactionInfo(postId: string) {
  const data =
    await sql<ReactionInfo>`SELECT ureactions.reactionid, ureactions.reactiontype, users.fname, users.lname FROM uposts JOIN ureactions ON uposts.postid = ureactions.postid JOIN users ON users.userid = ureactions.userid WHERE uposts.postid = ${postId}`;
  if (data.rows.length > 0) {
    return {
      isReacted: true,
      reactionId: data.rows[0].reactionid,
      reactionType: data.rows[0].reactiontype,
      reactor: `${data.rows[0].fname} ${data.rows[0].lname}`,
    };
  } else {
    return {
      isReacted: false,
      reactionId: "",
      reactionType: "",
      reactor: "",
    };
  }
}

export async function groupReactions(postId: string) {
  const data =
    await sql<GroupReaction>`SELECT COUNT(uposts.postid) as count, ureactions.reactiontype FROM uposts JOIN ureactions ON uposts.postid = ureactions.postid WHERE uposts.postid = ${postId} GROUP BY ureactions.reactiontype`;
  return data.rows.map((reaction) => {
    return {
      reactionType: reaction.reactiontype,
      count: reaction.count,
    };
  });
}

export async function totalReactions(postId: string) {
  const data =
    await sql<Reaction>`SELECT COUNT(uposts.postid) as reactions FROM uposts JOIN ureactions ON uposts.postid = ureactions.postid WHERE uposts.postid = ${postId}`;
  if (data.rows.length > 0) {
    return data.rows[0].reactions;
  } else {
    return "";
  }
}

export async function reactPost(
  postId: string,
  userId: string,
  reactionType: string
) {
  return await sql`INSERT INTO ureactions (postid, userid, reactiontype) VALUES (${postId}, ${userId}, ${reactionType}) ON CONFLICT (reactionid) DO NOTHING`;
}

export async function MediasInfo(postId: string) {
  const medias =
    await sql<Media>`SELECT * FROM uposts JOIN umedias ON uposts.postid = umedias.postid WHERE uposts.postid = ${postId} ORDER BY umedias.date DESC`;
  const mediaInfo = await Promise.all(
    medias.rows.map(async (media) => {
      const [
        reactionGroup,
        totalComments,
        totalReactions,
        firstMediaReactor,
        loggedInUserReactionInfo,
      ] = await Promise.all([
        mgroupReactions(postId, media.mediaid),
        mtotalComments(postId, media.mediaid),
        mtotalReactions(postId, media.mediaid),
        mfirstReactor(postId, media.mediaid),
        isMediaReacted(postId, media.mediaid, LoggedInUser.userid),
      ]);

      return {
        mediaId: media.mediaid,
        type: media.type,
        media: media.media,
        reactionInfo: {
          isReacted: loggedInUserReactionInfo.isReacted,
          reactionType: loggedInUserReactionInfo.reactionType,
          firstReactorInfo: firstMediaReactor,
          reactions: totalReactions,
          reactionGroup: reactionGroup,
        },
        commentInfo: {
          count: totalComments,
          comments: {
            loading: true,
            comments: [],
            page: 1,
          },
        },
        groupReactionInfo: await Promise.all(
          reactionGroup.map((reaction) => {
            return constructGroupReactionInfoForMedia(
              media.mediaid,
              postId,
              reaction
            );
          })
        ),
      };
    })
  );
  return mediaInfo;
}
export async function medias(postId: string) {
  const data =
    await sql<Media>`SELECT umedias.media, umedias.mediaid FROM uposts JOIN users ON uposts.userid = users.userid JOIN umedias ON uposts.postid = umedias.postid WHERE uposts.postid = ${postId} ORDER BY umedias.date DESC`;
  return data.rows.map((media) => {
    return {
      mediaId: media.mediaid,
      type: media.type,
      media: media.media,
    };
  });
}

export async function totalComments(postId: string) {
  const data =
    await sql<CommentsCount>`SELECT COUNT(uposts.postid) as comments FROM uposts JOIN ucomments ON uposts.postid = ucomments.postid WHERE uposts.postid = ${postId}`;
  return data.rows;
}

export async function comments(postId: string) {
  const data =
    await sql<Comment>`SELECT * FROM uposts JOIN ucomments ON uposts.postid = ucomments.postid WHERE uposts.postid = ${postId}`;
  return data.rows.map((comment) => {
    return {
      commentId: comment.commentid,
      comment: comment.comment,
      date: comment.date,
      user: {
        userId: comment.userid,
        fName: comment.fname,
        lName: comment.lname,
        profilePic: comment.profilepic,
      },
    };
  });
}

export async function getReactorsForReactionType(
  postId: string,
  reactionType: string
) {
  const reactors =
    await sql<PostReactor>`SELECT * FROM uposts JOIN ureactions ON uposts.postid = ureactions.postid JOIN users ON ureactions.userid = users.userid WHERE uposts.postid = ${postId} AND reactiontype = ${reactionType}`;
  return {
    reactionType: reactionType,
    reactors: reactors.rows.map((reactor) => {
      return {
        userId: reactor.userid,
        fName: reactor.fname,
        Lname: reactor.lname,
      };
    }),
  };
}

export async function constructGroupReactionInfo(
  postId: string,
  reaction: {
    reactionType: string;
    count: string;
  }
) {
  const query =
    await sql`SELECT * FROM uposts JOIN ureactions ON uposts.postid = ureactions.postid JOIN users ON ureactions.userid = users.userid WHERE uposts.postid = ${postId} AND ureactions.reactiontype = ${reaction.reactionType}`;
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

export async function getGroupedReactionInfo(
  postId: string,
  commentId: string,
  reactionInfo: { reactionType: string; count: string }
) {
  const query =
    await sql`SELECT * FROM uposts JOIN ucomments ON uposts.postid = ucomments.postid JOIN ucommentreactions ON ucommentreactions.commentid = ucomments.commentid WHERE ucomments.commentid = ${commentId} AND uposts.postid = ${postId}`;
  return {
    [reactionInfo.reactionType]: {
      loading: true,
      page: 1,
      rowCount: query.rowCount,
    },
  };
}
