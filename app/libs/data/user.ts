import { Story, StoryPhoto } from "@/app/types/db/story";
import { sql } from "@vercel/postgres";

export async function fetchPosts() {
  try {
    const data =
      await sql`SELECT * FROM uposts JOIN users ON uposts.userid = users.userid ORDER BY uposts.date DESC`;
    return data.rows;
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
      await sql`SELECT uphotos.* FROM uposts JOIN users ON uposts.userid = users.userid JOIN uphotos ON uposts.postid = uphotos.postid WHERE uposts.postid = ${postId} ORDER BY uphotos.date DESC`;
    return data.rows;
  } catch (error) {
    console.log("Database error", error);
    throw new Error("Faild to fetch dev data");
  }
}

export async function fetchAPhoto(postId: string, photoId: string) {
  try {
    const data =
      await sql`SELECT uphotos.* FROM uposts JOIN users ON uposts.userid = users.userid JOIN uphotos ON uposts.postid = uphotos.postid WHERE uposts.postid = ${postId} AND photoid = ${photoId}`;
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
