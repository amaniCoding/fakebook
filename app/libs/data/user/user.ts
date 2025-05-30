import { sql } from "@vercel/postgres";
import {
  Posts,
  Story,
  StoryMedia,
  Media,
  Comment,
  Reaction,
  ReactionGroup,
} from "./types";

export async function fetchPosts() {
  try {
    const posts =
      await sql<Posts>`SELECT * FROM uposts JOIN users ON uposts.userid = users.userid ORDER BY uposts.date DESC`;
    const allPosts = await Promise.all(
      posts.rows.map(async (row) => {
        const medias = sql<Media>`SELECT umedias.media, umedias.mediaid FROM uposts JOIN users ON uposts.userid = users.userid JOIN umedias ON uposts.postid = umedias.postid WHERE uposts.postid = ${row.post.postId} ORDER BY umedias.date DESC`;
        const comments = sql<Comment>`SELECT COUNT(uposts.postid) as comments FROM uposts JOIN ucomments ON uposts.postid = ucomments.postid WHERE uposts.postid = ${row.post.postId} ORDER BY ucomments.date DESC`;
        const reactions = sql<Reaction>`SELECT COUNT(uposts.postid) as reactions FROM uposts JOIN ureactions ON uposts.postid = ureactions.postid WHERE uposts.postid = ${row.post.postId} ORDER BY ureactions.date DESC`;
        const reactionGroup = sql<ReactionGroup>`SELECT COUNT(uposts.postid) as count, ureactions.reactiontype FROM uposts JOIN ureactions ON uposts.postid = ureactions.postid WHERE uposts.postid = ${row.post.postId} GROUP BY ureactions.reactiontype ORDER BY ureactions.date DESC`;
        return {
          post: {
            postId: row.post.postId,
            post: row.post.post,
            date: row.post.date,
          },
          medias: (await medias).rows,
          user: {
            userid: row.user.userid,
            fname: row.user.fname,
            lname: row.user.lname,
            profilepic: row.user.profilepic,
          },

          comments: (await comments).rows[0].comments,
          reactions: (await reactions).rows[0].reactions,
          reactionGroup: (await reactionGroup).rows,
        };
      })
    );
    return allPosts;
  } catch (error) {
    console.log("Database error", error);
    throw new Error("Faild to fetch dev data");
  }
}

export async function fetchAllStories() {
  try {
    const data =
      await sql<Story>`SELECT ustories.storyid, users.fname, users.lname, users.profilePic FROM ustories JOIN users ON ustories.userid = users.userid ORDER BY ustories.date DESC`;
    return data.rows;
  } catch (error) {
    console.log("Database error", error);
    throw new Error("Faild to fetch dev data");
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
    throw new Error("Faild to fetch dev data");
  }
}

export async function fetchUsers() {
  try {
    const data = await sql`SELECT * FROM users LIMIT 15`;
    return data.rows;
  } catch (error) {
    console.log("Database error", error);
    throw new Error("Faild to fetch dev data");
  }
}

export async function fetchAPost(postId: string) {
  try {
    const data =
      await sql`SELECT * FROM uposts JOIN users ON uposts.userid = users.userid WHERE postid = ${postId}`;
    return data.rows[0];
  } catch (error) {
    console.log("Database error", error);
    throw new Error("Faild to fetch dev data");
  }
}

export async function fetchCurrentStoryMedias(storyId: string) {
  try {
    const data =
      await sql<StoryMedia>`SELECT ustorymedias.media, users.fname, users.lname, users.profilepic FROM ustories JOIN users ON ustories.userid = users.userid JOIN ustorymedias ON ustories.storyid = ustorymedias.storyid WHERE ustories.storyid = ${storyId} ORDER BY ustorymedias.date DESC`;
    return data.rows;
  } catch (error) {
    console.log("Database error", error);
    throw new Error("Faild to fetch dev data");
  }
}

export async function fetchAllStoriesWithPhotos() {
  try {
    const data =
      await sql<StoryMedia>`SELECT ustorymedias.media FROM ustories JOIN users ON ustories.userid = users.userid JOIN ustorymedias ON ustories.storyid = ustorymedias.storyid ORDER BY ustorymedias.date DESC`;
    return data.rows;
  } catch (error) {
    console.log("Database error", error);
    throw new Error("Faild to fetch dev data");
  }
}

export async function fetchAStory(storyId: string) {
  try {
    const data =
      await sql<Story>`SELECT * FROM ustories JOIN users ON ustories.userid = users.userid WHERE storyid = ${storyId} ORDER BY ustories.date DESC`;
    return data.rows;
  } catch (error) {
    console.log("Database error", error);
    throw new Error("Faild to fetch dev data");
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
    throw new Error("Faild to fetch dev data");
  }
}
