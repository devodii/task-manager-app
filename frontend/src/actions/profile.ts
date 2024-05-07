"use server";

import { getUser } from "@/actions/user";
import { ApiResponse, Profile } from "@/types";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const api = process.env.API_URL;

export const createProfile = async (formdata: FormData) => {
  const user = await getUser();

  if (!user?.id) redirect("/sign-in");

  const image = formdata.get("image") as FormDataEntryValue;
  const username = formdata.get("username") as string;

  const imageUrl = await uploadImage(image);

  const response = await fetch(api + "/profile", {
    method: "POST",
    body: JSON.stringify({ username, imageUrl: imageUrl ?? "" }),
    headers: {
      SessionId: user?.id ?? "",
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();

  revalidatePath("/onboarding");
  revalidatePath("/dashboard");

  return data;
};

const uploadImage = async (image: any): Promise<string> => {
  if (!image) return "";

  const data = new FormData();
  data.append("file", image);
  data.append("api_key", process.env.CLOUDINARY_API_KEY!);
  data.append("upload_preset", process.env.CLOUDINARY_UPLOAD_PRESET!);

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/deyz1mlpt/image/upload`,
    {
      method: "POST",
      body: data,
    }
  );

  const file = await response.json();

  return file.secure_url;
};

export const getProfile = async () => {
  try {
  const SessionId = cookies().get("merchant_id")?.value ?? "";

  const response = await fetch(api + "/profile", {
    method: "GET",
    headers: {
      SessionId,
    },
    credentials: "include",
  });

  const profile: ApiResponse<Profile> = await response.json();

  return profile;
  } catch (error) {
    console.log("An error occured while fetching profile", { error });
    return;
  }
};
