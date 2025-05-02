"use server";
import { sql } from "@vercel/postgres";

import { revalidatePath } from "next/cache";
import { put } from "@vercel/blob";

import { z } from "zod";

const postSchema = z.object({
  breif_title: z.string({
    invalid_type_error: "Please insert breif title.",
  }),

  breif_description: z.string({
    invalid_type_error: "Please insert breif description.",
  }),
});
export type State = {
  errors?: {
    breif_title?: string[];
    breif_description?: string[];
  };
  message?: string | null;
  success: boolean;
};
export async function createPost(
  prevState: State | undefined,
  formData: FormData
) {
  const validatedFields = postSchema.safeParse({
    breif_title: formData.get("breif_title"),
    breif_description: formData.get("breif_description"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Create a Post.",
      success: false,
    };
  }

  const { breif_title, breif_description } = validatedFields.data;

  const invalidateFields = {
    breif_photo: formData.get("breif_photo") as File,

    cont_title_0: formData.get("cont_title_0") as string,
    cont_desc_0: formData.get("cont_desc_0") as string,
    cont_codesnip_0: formData.get("cont_codesnip_0") as string,
    cont_photo_0: formData.get("cont_photo_0") as File,

    cont_title_1: formData.get("cont_title_1") as string,
    cont_desc_1: formData.get("cont_desc_1") as string,
    cont_codesnip_1: formData.get("cont_codesnip_1") as string,
    cont_photo_1: formData.get("cont_photo_1") as File,

    cont_title_2: formData.get("cont_title_2") as string,
    cont_desc_2: formData.get("cont_desc_2") as string,
    cont_codesnip_2: formData.get("cont_codesnip_2") as string,
    cont_photo_2: formData.get("cont_photo_2") as File,

    cont_title_3: formData.get("cont_title_3") as string,
    cont_desc_3: formData.get("cont_desc_3") as string,
    cont_codesnip_3: formData.get("cont_codesnip_3") as string,
    cont_photo_3: formData.get("cont_photo_3") as File,
  };

  let breiffileUrl;
  let fileNameUrl0;
  let fileNameUrl1;
  let fileNameUrl2;
  let fileNameUrl3;

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

  if (invalidateFields.cont_photo_0?.size !== 0) {
    console.log(invalidateFields.cont_photo_0?.size);
    const blob0 = await put(
      invalidateFields.cont_photo_0?.name,
      invalidateFields.cont_photo_0,
      {
        access: "public",
      }
    );

    fileNameUrl0 = blob0.url;
  }

  if (invalidateFields.cont_photo_1?.size !== undefined) {
    console.log("fuckkkkkkkk", invalidateFields.cont_photo_1);
    const blob1 = await put(
      invalidateFields.cont_photo_1?.name,
      invalidateFields.cont_photo_1,
      {
        access: "public",
      }
    );
    fileNameUrl1 = blob1.url;
  }
  if (invalidateFields.cont_photo_2?.size !== undefined) {
    const blob2 = await put(
      invalidateFields.cont_photo_2?.name,
      invalidateFields.cont_photo_2,
      {
        access: "public",
      }
    );
    fileNameUrl2 = blob2.url;
  }
  if (invalidateFields.cont_photo_3?.size !== undefined) {
    const blob3 = await put(
      invalidateFields.cont_photo_3?.name,
      invalidateFields.cont_photo_3,
      {
        access: "public",
      }
    );
    fileNameUrl3 = blob3.url;
  }
  try {
    const post = {
      user_id: "bb173bd3-cb40-47a5-8415-29655e71a334",
      breif_title: breif_title,
      breif_description: breif_description,
      photo: breiffileUrl,

      cont_0_title: invalidateFields.cont_title_0,
      cont_0_description: invalidateFields.cont_desc_0,
      cont_0_code_snippet: invalidateFields.cont_codesnip_0,
      cont_0_photo: fileNameUrl0,

      cont_1_title: invalidateFields.cont_title_1,
      cont_1_description: invalidateFields.cont_desc_1,
      cont_1_code_snippet: invalidateFields.cont_codesnip_1,
      cont_1_photo: fileNameUrl1,

      cont_2_title: invalidateFields.cont_title_2,
      cont_2_description: invalidateFields.cont_desc_2,
      cont_2_code_snippet: invalidateFields.cont_codesnip_2,
      cont_2_photo: fileNameUrl2,

      cont_3_title: invalidateFields.cont_title_3,
      cont_3_description: invalidateFields.cont_desc_3,
      cont_3_code_snippet: invalidateFields.cont_codesnip_3,
      cont_3_photo: fileNameUrl3,
    };
    console.log("not posted");

    await sql`INSERT INTO posts (user_id, breif_title, breif_description, photo, cont_0_title, cont_0_description, cont_0_code_snippet, cont_0_photo, cont_1_title, cont_1_description, cont_1_code_snippet, cont_1_photo, cont_2_title, cont_2_description, cont_2_code_snippet, cont_2_photo, cont_3_title, cont_3_description, cont_3_code_snippet, cont_3_photo) VALUES (${post.user_id}, ${post.breif_title}, ${post.breif_description}, ${post.photo}, ${post.cont_0_title}, ${post.cont_0_description}, ${post.cont_0_code_snippet}, ${post.cont_0_photo}, ${post.cont_1_title}, ${post.cont_1_description}, ${post.cont_1_code_snippet}, ${post.cont_1_photo}, ${post.cont_2_title}, ${post.cont_2_description}, ${post.cont_2_code_snippet}, ${post.cont_2_photo}, ${post.cont_3_title}, ${post.cont_3_description}, ${post.cont_3_code_snippet}, ${post.cont_3_photo} ) ON CONFLICT (post_id) DO NOTHING;
      `;
    console.log("not posted");
    revalidatePath("/home");
    return {
      errors: {},
      message: "",
      success: true,
    };
  } catch (error) {
    console.error("Error while trying to upload a file\n", error);
  }
}

export async function fetchStoryPhotos(storyId: string) {
  try {
    const data =
      await sql`SELECT ustoryphotos.* FROM ustories JOIN users ON ustories.userid = users.userid JOIN ustoryphotos ON ustories.storyid = ustoryphotos.storyid WHERE ustories.storyid = ${storyId} ORDER BY ustoryphotos.date DESC`;
    return data.rows;
  } catch (error) {
    console.log("Database error", error);
    throw new Error("Faild to fetch dev data");
  }
}
