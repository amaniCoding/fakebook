import { sql } from "@vercel/postgres";
import {
  PostDB,
  Story,
  StoryMedia,
  Media,
  Comment,
  Reaction,
  ReactionGroup,
  PostDBNew,
  MediaReactionGroup,
  FirstMediaReactor,
  MediaCommentsCount,
  MediaReactionCount,
  CommentData,
} from "./types";

import { PostReactionInfo } from "../../actions/user/types";
import { LoggedInUser } from "@/app/config/loggedinuser";

async function getPostMedias(postId: string) {
  const data =
    await sql<Media>`SELECT umedias.media, umedias.mediaid FROM uposts JOIN users ON uposts.userid = users.userid JOIN umedias ON uposts.postid = umedias.postid WHERE uposts.postid = ${postId} ORDER BY umedias.date DESC`;
  return data.rows;
}

async function getPostTotalComments(postId: string) {
  const data =
    await sql<Comment>`SELECT COUNT(uposts.postid) as comments FROM uposts JOIN ucomments ON uposts.postid = ucomments.postid WHERE uposts.postid = ${postId}`;
  return data.rows;
}

async function getPostComments(postId: string) {
  const data =
    await sql<CommentData>`SELECT * FROM uposts JOIN ucomments ON uposts.postid = ucomments.postid WHERE uposts.postid = ${postId}`;
  return data.rows;
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

async function firstReactorInfo(postId: string) {
  const data =
    await sql<PostReactionInfo>`SELECT ureactions.reactionid, ureactions.reactiontype, users.fname, users.lname FROM uposts JOIN ureactions ON uposts.postid = ureactions.postid JOIN users ON users.userid = ureactions.userid WHERE uposts.postid = ${postId}`;
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

export async function fetchPosts(userId: string) {
  try {
    const posts =
      await sql<PostDB>`SELECT * FROM uposts JOIN users ON uposts.userid = users.userid ORDER BY uposts.date DESC`;
    const allPosts = await Promise.all(
      posts.rows.map(async (row) => {
        const [
          _isPostReactedByLoggedInUser,
          _totalPostReactions,
          _groupPostReactions,
          _firstReactorInfo,
          medias,
          commentsCount,
          comments,
        ] = await Promise.all([
          isPostReactedByLoggedInUser(row.postid, userId),
          totalPostReactions(row.postid),
          groupPostReactions(row.postid),
          firstReactorInfo(row.postid),
          getPostMedias(row.postid),
          getPostTotalComments(row.postid),
          getPostComments(row.postid),
        ]);
        return {
          postId: row.postid,
          post: row.post,
          date: row.date,

          medias: medias,
          user: {
            userid: row.userid,
            fname: row.fname,
            lname: row.lname,
            profilepic: row.profilepic,
          },

          commentInfo: {
            commentsCount: commentsCount[0].comments,
            comments: comments,
          },

          reactionInfo: {
            isReacted: _isPostReactedByLoggedInUser.isReacted,
            reactionType: _isPostReactedByLoggedInUser.reactionType,
            firstReactorInfo: _firstReactorInfo,
            reactions: _totalPostReactions,
            reactionGroup: _groupPostReactions,
          },
        };
      })
    );
    return allPosts;
  } catch (error) {
    console.log("Database error", error);
    throw new Error("Faild to fetch feed data");
  }
}

export async function fetchNewPostInfo(postId: string, userId: string) {
  try {
    const posts =
      await sql<PostDB>`SELECT * FROM uposts JOIN users ON uposts.userid = users.userid WHERE uposts.postid = ${postId} ORDER BY uposts.date DESC`;
    const allPosts = await Promise.all(
      posts.rows.map(async (row) => {
        const [
          _isPostReactedByLoggedInUser,
          _totalPostReactions,
          _groupPostReactions,
          _firstReactorInfo,
          medias,
          commentsCount,
          comments,
        ] = await Promise.all([
          isPostReactedByLoggedInUser(row.postid, userId),
          totalPostReactions(row.postid),
          groupPostReactions(row.postid),
          firstReactorInfo(row.postid),
          getPostMedias(row.postid),
          getPostTotalComments(row.postid),
          getPostComments(row.postid),
        ]);
        return {
          postId: row.postid,
          post: row.post,
          date: row.date,

          medias: medias,
          user: {
            userid: row.userid,
            fname: row.fname,
            lname: row.lname,
            profilepic: row.profilepic,
          },

          commentInfo: {
            commentsCount: commentsCount[0].comments,
            comments: comments,
          },

          reactionInfo: {
            isReacted: _isPostReactedByLoggedInUser.isReacted,
            reactionType: _isPostReactedByLoggedInUser.reactionType,
            firstReactorInfo: _firstReactorInfo,
            reactions: _totalPostReactions,
            reactionGroup: _groupPostReactions,
          },
        };
      })
    );
    return allPosts;
  } catch (error) {
    console.log("Database error", error);
    throw new Error("Faild to fetch feed data");
  }
}

export async function fetchAllStories() {
  try {
    const data =
      await sql<Story>`SELECT ustories.storyid, users.fname, users.lname, users.profilePic FROM ustories JOIN users ON ustories.userid = users.userid ORDER BY ustories.date DESC`;
    return data.rows;
  } catch (error) {
    console.log("Database error", error);
    throw new Error("Faild to fetch stories");
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
    await sql<CommentData>`SELECT * FROM uposts JOIN umedias ON uposts.postid = umedias.postid JOIN umediacomments ON umediacomments.mediaid = umedias.mediaid JOIN users ON users.userid = umediacomments.userid WHERE uposts.postid = ${postId} AND umedias.mediaid = ${mediaId}`;
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

export async function isMediaReactedByLoggedInUser(
  postId: string,
  mediaId: string,
  userId: string
) {
  const data =
    await sql<FirstMediaReactor>`SELECT users.fname, users.lname, users.userid, umediareactions.reactiontype FROM uposts JOIN umedias ON uposts.postid = umedias.postid JOIN umediareactions ON umediareactions.mediaid = umedias.mediaid JOIN users ON umediareactions.userid = users.userid WHERE uposts.postid = ${postId} AND umedias.mediaid = ${mediaId} AND users.userid = ${userId}`;
  if (data.rows.length > 0) {
    return {
      isReacted: data.rows.length > 0 ? true : false,
      reactionType: data.rows[0].reactiontype,
    };
  } else {
    return {
      isReacted: false,
      reactionType: "",
    };
  }
}

export async function getPostMediaInfo(postId: string) {
  const medias =
    await sql<Media>`SELECT * FROM uposts JOIN umedias ON uposts.postid = umedias.postid WHERE uposts.postid = ${postId} ORDER BY umedias.date DESC`;
  const mediaInfo = await Promise.all(
    medias.rows.map(async (media) => {
      const [
        reactionGroup,
        commentsCount,
        reactionCount,
        firstMediaReactor,
        loggedInUserReactionInfo,
        mediaComments,
      ] = await Promise.all([
        fetchMediaReactionsInGroup(postId, media.mediaid),
        fetchMediaCommentsCount(postId, media.mediaid),
        getMediaReactionCount(postId, media.mediaid),
        getFirstMediaReactor(postId, media.mediaid),
        isMediaReactedByLoggedInUser(
          postId,
          media.mediaid,
          LoggedInUser.userid
        ),
        fetchMediaComments(postId, media.mediaid),
      ]);

      return {
        mediaid: media.mediaid,
        type: media.type,
        media: media.media,
        reactionInfo: {
          isReacted: loggedInUserReactionInfo.isReacted,
          reactionType: loggedInUserReactionInfo.reactionType,
          firstReactorInfo: firstMediaReactor,
          reactions: reactionCount,
          reactionGroup: reactionGroup,
        },
        commentInfo: {
          count: commentsCount,
          comments: mediaComments,
        },
      };
    })
  );
  return mediaInfo;
}

export async function fetchPost(postId: string) {
  const data =
    await sql<PostDBNew>`SELECT * FROM uposts JOIN users ON uposts.userid = users.userid WHERE uposts.postid = ${postId}`;
  return data.rows;
}

export async function fetchPostInfo(postId: string) {
  try {
    const [post, medias] = await Promise.all([
      fetchPost(postId),
      getPostMediaInfo(postId),
    ]);

    return {
      postId: post[0].postid,
      post: post[0].post,
      date: post[0].date,
      user: {
        userId: post[0].userid,
        fname: post[0].fname,
        lname: post[0].lname,
        profilePic: post[0].profilepic,
      },
      medias: medias,
    };
  } catch (error) {
    console.log("Failed to fetch postinfo", error);
  }
}

export async function fetchUsers() {
  try {
    const data = await sql`SELECT * FROM users LIMIT 15`;
    return data.rows;
  } catch (error) {
    console.log("Database error", error);
    throw new Error("Faild to fetch users");
  }
}

export async function fetchAPost(postId: string) {
  try {
    const data =
      await sql`SELECT * FROM uposts JOIN users ON uposts.userid = users.userid WHERE postid = ${postId}`;
    return data.rows[0];
  } catch (error) {
    console.log("Database error", error);
    throw new Error("Faild to fetch a post");
  }
}

export async function fetchCurrentStoryMedias(storyId: string) {
  try {
    const data =
      await sql<StoryMedia>`SELECT ustorymedias.media, users.fname, users.lname, users.profilepic FROM ustories JOIN users ON ustories.userid = users.userid JOIN ustorymedias ON ustories.storyid = ustorymedias.storyid WHERE ustories.storyid = ${storyId} ORDER BY ustorymedias.date DESC`;
    return data.rows;
  } catch (error) {
    console.log("Database error", error);
    throw new Error("Faild to fetch current sotry medias");
  }
}

export async function fetchAllStoriesWithPhotos() {
  try {
    const data =
      await sql<StoryMedia>`SELECT ustorymedias.media FROM ustories JOIN users ON ustories.userid = users.userid JOIN ustorymedias ON ustories.storyid = ustorymedias.storyid ORDER BY ustorymedias.date DESC`;
    return data.rows;
  } catch (error) {
    console.log("Database error", error);
    throw new Error("Faild to fetch story photos");
  }
}

export async function fetchAStory(storyId: string) {
  try {
    const data =
      await sql<Story>`SELECT * FROM ustories JOIN users ON ustories.userid = users.userid WHERE storyid = ${storyId} ORDER BY ustories.date DESC`;
    return data.rows;
  } catch (error) {
    console.log("Database error", error);
    throw new Error("Faild to fetch a story");
  }
}

export async function fetchStoriesForSlider() {
  try {
    const users =
      await sql<Story>`SELECT ustories.storyid, users.fname, users.lname, users.profilePic FROM ustories JOIN users ON ustories.userid = users.userid ORDER BY ustories.date DESC`;

    const story = await Promise.all(
      users.rows.map(async (row) => {
        const medias =
          await sql<StoryMedia>`SELECT ustorymedias.media, ustorymedias.type, users.fname, users.lname, users.profilepic FROM ustories JOIN users ON ustories.userid = users.userid JOIN ustorymedias ON ustories.storyid = ustorymedias.storyid WHERE ustories.storyid = ${row.storyid} ORDER BY ustorymedias.date DESC`;
        return {
          storyid: row.storyid,
          fname: row.fname,
          lname: row.lname,
          profilepic: row.profilepic,
          medias: {
            media: medias.rows[0].media,
            type: medias.rows[0].type,
          },
        };
      })
    );

    return story;
  } catch (error) {
    console.log("Database error", error);
    throw new Error("Faild to fetch stories slider data");
  }
}
