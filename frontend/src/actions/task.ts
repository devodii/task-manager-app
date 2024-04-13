"use server";

import { getUser } from "@/actions/user";
import { Task } from "@/types";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const api = process.env.API_URL;

export const mockCreateTask = async (formdata: FormData) => {
  const user = await getUser();

  if (!user?.id) {
    redirect("?auth=signIn");
  }

  redirect("/dashboard?createTask=true");
};

export const createTask = async (formdata: FormData) => {
  const title = formdata.get("title") as string;
  const description = formdata.get("description") as string;

  const user = await getUser();

  const userId = user?.id;

  console.log({ title, description });

  const response = await fetch(api + "/task", {
    method: "POST",
    headers: {
      SessionId: userId,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title, description }),
  });

  const task = await response.json();

  revalidatePath("/dashboard", "page");
};

export const getTasks = async (): Promise<Task[] | []> => {
  try {
    const user = await getUser();

    const userId = user?.id;

    if (!userId) return [];

    const response = await fetch(api + "/task", {
      method: "GET",
      headers: {
        SessionId: user?.id,
      },
    });

    const tasks = await response.json();

    return tasks as Task[];
  } catch (error) {
    console.log("An error occured while fetching tasks", { error });
    return [];
  }
};
