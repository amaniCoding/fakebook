import { sql } from "@vercel/postgres";
import {
  PostDB,
  Story,
  StoryMedia,
  Media,
  Comment,
  Reaction,
  ReactionGroup,
  User,
} from "./types";

import { PostReactionInfo } from "../../actions/user/types";

async function getPostMedias(postId: string) {
  const rows =
    await sql<Media>`SELECT umedias.media, umedias.mediaid FROM uposts JOIN users ON uposts.userid = users.userid JOIN umedias ON uposts.postid = umedias.postid WHERE uposts.postid = ${postId} ORDER BY umedias.date DESC`;
  return rows;
}

async function getPostTotalComments(postId: string) {
  const rows =
    await sql<Comment>`SELECT COUNT(uposts.postid) as comments FROM uposts JOIN ucomments ON uposts.postid = ucomments.postid WHERE uposts.postid = ${postId}`;
  return rows;
}

async function getPostTotalReactions(postId: string) {
  const rows =
    await sql<Reaction>`SELECT COUNT(uposts.postid) as reactions FROM uposts JOIN ureactions ON uposts.postid = ureactions.postid WHERE uposts.postid = ${postId}`;
  return rows;
}

async function groupPostReactions(postId: string) {
  const rows =
    await sql<ReactionGroup>`SELECT COUNT(uposts.postid) as count, ureactions.reactiontype FROM uposts JOIN ureactions ON uposts.postid = ureactions.postid WHERE uposts.postid = ${postId} GROUP BY ureactions.reactiontype`;
  return rows;
}

async function postReactionInfo(postId: string, userId: string) {
  const rows =
    await sql<PostReactionInfo>`SELECT ureactions.reactiontype, users.fname, users.lname FROM uposts JOIN ureactions ON uposts.postid = ureactions.postid JOIN users ON users.userid = ureactions.userid WHERE uposts.postid = ${postId} AND users.userid = ${userId}`;
  return rows;
}

export async function fetchPosts(user: User) {
  try {
    const posts =
      await sql<PostDB>`SELECT * FROM uposts JOIN users ON uposts.userid = users.userid ORDER BY uposts.date DESC`;
    const allPosts = await Promise.all(
      posts.rows.map(async (row) => {
        const [medias, comments, reactions, reactionGroup, reactionInfo] =
          await Promise.all([
            getPostMedias(row.postid),
            getPostTotalComments(row.postid),
            getPostTotalReactions(row.postid),
            groupPostReactions(row.postid),
            postReactionInfo(row.post, user.userid),
          ]);
        return {
          postId: row.postid,
          post: row.post,
          date: row.date,

          medias: medias.rows,
          user: {
            userid: row.userid,
            fname: row.fname,
            lname: row.lname,
            profilepic: row.profilepic,
          },

          comments: comments.rows[0].comments,

          reactionInfo: {
            isReacted: reactionInfo.rows.length > 0 ? true : false,
            reactionType: reactionInfo.rows[0]?.reactiontype,
            reactor: `${reactionInfo.rows[0]?.fname} ${reactionInfo.rows[0]?.lname}`,
            reactions: reactions.rows[0].reactions,
            reactionGroup: reactionGroup.rows,
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

export async function fetchPhotos(postId: string) {
  try {
    const data =
      await sql<Media>`SELECT umedias.mediaid, umedias.type, umedias.media FROM uposts JOIN users ON uposts.userid = users.userid JOIN umedias ON uposts.postid = umedias.postid WHERE uposts.postid = ${postId} ORDER BY umedias.date DESC`;
    return data.rows;
  } catch (error) {
    console.log("Database error", error);
    throw new Error("Faild to fetch dev data");
  }
}

export async function fetchAPhoto(postId: string, mediaId: string) {
  try {
    const data =
      await sql<Media>`SELECT umedias.mediaid, umedias.type, umedias.media FROM uposts JOIN users ON uposts.userid = users.userid JOIN umedias ON uposts.postid = umedias.postid WHERE uposts.postid = ${postId} AND mediaid = ${mediaId}`;
    return data.rows;
  } catch (error) {
    console.log("Database error", error);
    throw new Error("Faild to fetch a photo");
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
