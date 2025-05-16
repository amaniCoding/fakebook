"use server";
import { QueryResultRow, sql } from "@vercel/postgres";

import { revalidatePath } from "next/cache";
import { put } from "@vercel/blob";
import { StoryPhoto } from "@/app/types/db/user";
export type State = {
  isSuccessfull: boolean;
  post: {
    post: QueryResultRow;
    photos: QueryResultRow[];
  };
};
export async function createPost(
  prevState: State | undefined,
  formData: FormData
) {
  const photos: File[] = formData.getAll("photos") as File[];
  const post = formData.get("post") as string;
  const photoUrls = [];
  if (photos && photos.length > 0) {
    // await Promise.all(
    //   photos.map(async (photo) => {
    //     const name = photo.name;
    //     const file = photo;
    //     if (photo.size! === 0) {
    //       const blob = await put(name, file, {
    //         access: "public",
    //         addRandomSuffix: true,
    //       });

    //       const photoUrl = blob.url;
    //       photoUrls.push(photoUrl);
    //     }
    //   })
    // );
    for (const photo in photos) {
      const name = photos[photo].name;
      const file = photos[photo];

      try {
        const blob = await put(name, file, {
          access: "public",
          addRandomSuffix: true,
        });

        const photoUrl = blob.url;
        photoUrls.push(photoUrl);
      } catch {}
    }
  }

  try {
    const InsertedPost =
      await sql`INSERT INTO uposts (posttype, userid, post) VALUES ('userpost', '7df4d265-83f8-4ea0-86a2-0e8e7088f9a5', ${post}) ON CONFLICT (postid) DO NOTHING;
      `;

    const posts = await sql`SELECT * FROM uposts`;

    const postId = posts.rows[posts.rows.length - 1].postid;
    await Promise.all(
      photoUrls.map((url) => {
        return sql`INSERT INTO uphotos (postid, photo) VALUES (${postId}, ${url}) ON CONFLICT (photoid) DO NOTHING`;
      })
    );

    console.log("INSERTED POST", InsertedPost);

    console.log("✅POSTED");
    revalidatePath("/");
    return {
      isSuccessfull: true,
      post: {
        post: {},
        photos: [],
      },
    };
  } catch (error) {
    console.error("Error while trying to upload a file\n", error);
    return {
      isSuccessfull: true,
      post: {
        post: {},
        photos: [],
      },
    };
  }
}

export async function fetchStoryPhotos(storyId: string | undefined) {
  try {
    const data =
      await sql<StoryPhoto>`SELECT ustoryphotos.photo, users.fname, users.lname, users.profilepic FROM ustories JOIN users ON ustories.userid = users.userid JOIN ustoryphotos ON ustories.storyid = ustoryphotos.storyid WHERE ustories.storyid = ${storyId} ORDER BY ustoryphotos.date DESC`;
    return data.rows;
  } catch (error) {
    console.log("Database error", error);
    throw new Error("Faild to fetch dev data");
  }
}
