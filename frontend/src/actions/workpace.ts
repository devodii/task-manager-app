"use server";

import { revalidatePath } from "next/cache";
import { getUser } from "./user";

const api = process.env.API_URL;

export const createWorkspace = async (formdata: FormData) => {
  const name = formdata.get("name") as string;

  const user = await getUser();

  const userId = user?.id;

  await fetch(api + "/workspace", {
    method: "POST",
    headers: {
      SessionId: userId ?? "",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name }),
  });

  revalidatePath("/dashboard", "page");
  return { success: true };
};

export const getWorkspace = async () => {
  try {
    const user = await getUser();

    if (!user?.id) return;

    const response = await fetch(api + "/workspace", {
      headers: {
        SessionId: user?.id ?? "",
        "Content-Type": "application/json",
      },
    });

    const workspace = await response.json();

    return workspace;
  } catch (error) {
    console.log("An error occured while fetching workspace", { error });
    return {} as any;
  }
};
