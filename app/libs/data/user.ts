import { Story, StoryPhoto, Post, Media } from "@/app/types/db/user";
import { sql } from "@vercel/postgres";

export async function fetchPosts() {
  try {
    const posts =
      await sql<Post>`SELECT * FROM uposts JOIN users ON uposts.userid = users.userid ORDER BY uposts.date DESC`;
    const getMedias = Promise.all(
      posts.rows.map(async (row) => {
        const medias =
          await sql<Media>`SELECT umedias.media, umedias.mediaid FROM uposts JOIN users ON uposts.userid = users.userid JOIN umedias ON uposts.postid = umedias.postid WHERE uposts.postid = ${row.postid} ORDER BY umedias.date DESC`;
        return {
          postId: row.postid,
          fname: row.fname,
          lname: row.lname,
          profilepic: row.profilepic,
          post: row.post,
          medias: medias.rows,
        };
      })
    );
    return getMedias;
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
      await sql`SELECT umedias.* FROM uposts JOIN users ON uposts.userid = users.userid JOIN umedias ON uposts.postid = umedias.postid WHERE uposts.postid = ${postId} ORDER BY umedias.date DESC`;
    return data.rows;
  } catch (error) {
    console.log("Database error", error);
    throw new Error("Faild to fetch dev data");
  }
}

export async function fetchAPhoto(postId: string, photoId: string) {
  try {
    const data =
      await sql`SELECT umedias.* FROM uposts JOIN users ON uposts.userid = users.userid JOIN umedias ON uposts.postid = umedias.postid WHERE uposts.postid = ${postId} AND photoid = ${photoId}`;
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

export async function fetchCurrentStoryPhotos(storyId: string) {
  try {
    const data =
      await sql<StoryPhoto>`SELECT ustoryphotos.photo, users.fname, users.lname, users.profilepic FROM ustories JOIN users ON ustories.userid = users.userid JOIN ustoryphotos ON ustories.storyid = ustoryphotos.storyid WHERE ustories.storyid = ${storyId} ORDER BY ustoryphotos.date DESC`;
    return data.rows;
  } catch (error) {
    console.log("Database error", error);
    throw new Error("Faild to fetch dev data");
  }
}

export async function fetchAllStoriesWithPhotos() {
  try {
    const data =
      await sql<StoryPhoto>`SELECT ustoryphotos.photo FROM ustories JOIN users ON ustories.userid = users.userid JOIN ustoryphotos ON ustories.storyid = ustoryphotos.storyid ORDER BY ustoryphotos.date DESC`;
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
        const photo =
          await sql<StoryPhoto>`SELECT ustoryphotos.photo, users.fname, users.lname, users.profilepic FROM ustories JOIN users ON ustories.userid = users.userid JOIN ustoryphotos ON ustories.storyid = ustoryphotos.storyid WHERE ustories.storyid = ${row.storyid} ORDER BY ustoryphotos.date DESC`;
        return {
          storyid: row.storyid,
          fname: row.fname,
          lname: row.lname,
          profilepic: row.profilepic,
          photo: photo.rows[0].photo,
        };
      })
    );

    return story;
  } catch (error) {
    console.log("Database error", error);
    throw new Error("Faild to fetch dev data");
  }
}
