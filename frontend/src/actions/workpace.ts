"use server";

import { Workspace } from "@/types";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getUser } from "./user";

const api = process.env.API_URL;

export const createWorkspace = async (formdata: FormData) => {
  const name = formdata.get("name") as string;

  const user = await getUser();

  const userId = user?.id;

  const response = await fetch(api + "/workspace", {
    method: "POST",
    headers: {
      SessionId: userId ?? "",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name }),
  });

  const workspace: Workspace = await response.json();

  revalidatePath("/dashboard", "page");

  if (workspace?.id) {
    redirect("/dashboard/workspace");
  }

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

    const workspace: Workspace = await response.json();

    return workspace;
  } catch (error) {
    console.log("An error occured while fetching workspace", { error });
    return {} as unknown as Workspace;
  }
};
