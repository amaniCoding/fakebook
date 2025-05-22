"use server";
import { QueryResultRow, sql } from "@vercel/postgres";

import { revalidatePath } from "next/cache";
import { put } from "@vercel/blob";
import { StoryMedia } from "@/app/types/db/user";
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
  const medias: File[] = formData.getAll("photos") as File[];
  const post = formData.get("post") as string;
  const photoUrls = [];
  if (medias && medias.length > 0) {
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
    for (const meida in medias) {
      const name = medias[meida].name;
      const file = medias[meida];
      const type = medias[meida].type;

      try {
        const blob = await put(name, file, {
          access: "public",
          addRandomSuffix: true,
        });

        const photoUrl = blob.url;
        const mediaData = {
          url: photoUrl,
          type: type,
        };
        photoUrls.push(mediaData);
      } catch {}
    }
  }

  try {
    const InsertedPost =
      await sql`INSERT INTO uposts (posttype, userid, post) VALUES ('userpost', '7df4d265-83f8-4ea0-86a2-0e8e7088f9a5', ${post}) ON CONFLICT (postid) DO NOTHING RETURNING *;
      `;

    const postId = InsertedPost.rows[0].postid;
    if (photoUrls && photoUrls.length > 0) {
      await Promise.all(
        photoUrls.map((url) => {
          return sql`INSERT INTO umedias (postid, media, type) VALUES (${postId}, ${url.url}, ${url.type}) ON CONFLICT (mediaid) DO NOTHING`;
        })
      );
    }

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
      await sql<StoryMedia>`SELECT ustorymedias.media, ustorymedias.type, users.fname, users.lname, users.profilepic FROM ustories JOIN users ON ustories.userid = users.userid JOIN ustorymedias ON ustories.storyid = ustorymedias.storyid WHERE ustories.storyid = ${storyId} ORDER BY ustorymedias.date DESC`;
    return data.rows;
  } catch (error) {
    console.log("Database error", error);
    throw new Error("Faild to fetch dev data");
  }
}
