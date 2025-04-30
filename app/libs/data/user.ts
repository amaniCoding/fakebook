import { sql } from "@vercel/postgres";

export async function fetchPosts() {
  try {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    const data = await sql`SELECT * FROM uposts JOIN users ON uposts.userid = users.userid ORDER BY uposts.date DESC`;
    return data.rows;
  } catch(error) {
    console.log("Database error", error);
    throw new Error("Faild to fetch dev data");
  }
}


export async function fetchPhotos(postId: string) {
  try {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    const data = await sql`SELECT uphotos.* FROM uposts JOIN users ON uposts.userid = users.userid JOIN uphotos ON uposts.postid = uphotos.postid WHERE uposts.postid = ${postId} ORDER BY uphotos.date DESC`;
    return data.rows;
  } catch(error) {
    console.log("Database error", error);
    throw new Error("Faild to fetch dev data");
  }
}


export async function fetchAPhoto(postId: string, photoId: string) {
  try {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    const data = await sql`SELECT uphotos.* FROM uposts JOIN users ON uposts.userid = users.userid JOIN uphotos ON uposts.postid = uphotos.postid WHERE uposts.postid = ${postId} AND photoid = ${photoId}`;
    return data.rows;
  } catch(error) {
    console.log("Database error", error);
    throw new Error("Faild to fetch dev data");
  }
}

export async function fetchUsers() {
  try {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    const data = await sql`SELECT * FROM users LIMIT 15`;
    return data.rows;
  } catch(error) {
    console.log("Database error", error);
    throw new Error("Faild to fetch dev data");
  }
}

export async function fetchAPost(postId: string) {
  try {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    const data = await sql`SELECT * FROM uposts JOIN users ON uposts.userid = users.userid WHERE postid = ${postId}`;
    return data.rows[0];
  } catch(error) {
    console.log("Database error", error);
    throw new Error("Faild to fetch dev data");
  }
}