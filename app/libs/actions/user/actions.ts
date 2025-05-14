/* eslint-disable @typescript-eslint/no-unused-vars */
"use server";
import { sql } from "@vercel/postgres";

import { revalidatePath } from "next/cache";
import { put } from "@vercel/blob";
import { StoryPhoto } from "@/app/types/db/user";

export async function createPost(formData: FormData) {
  const invalidateFields = {
    breif_photo: formData.get("breif_photo") as File,
  };

  let breiffileUrl;

  if (invalidateFields.breif_photo?.size !== 0) {
    const blob = await put(
      invalidateFields.breif_photo?.name,
      invalidateFields.breif_photo,
      {
        access: "public",
      }
    );

    breiffileUrl = blob.url;
  }
  try {
    await sql`INSERT INTO posts () ON CONFLICT (post_id) DO NOTHING;
      `;
    console.log("not posted");
    revalidatePath("/home");
  } catch (error) {
    console.error("Error while trying to upload a file\n", error);
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
