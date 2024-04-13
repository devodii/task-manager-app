"use server";

import { getUser } from "@/actions/user";
import { Task } from "@/types";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const api = process.env.API_URL;

export const mockCreateTask = async (formdata: FormData) => {
  const user = await getUser();

  const task = formdata.get("task") as string;

  if (!user?.id) {
    redirect("?auth=signIn");
  }

  redirect(`/dashboard?task=${task}`);
};

export const createTask = async (formdata: FormData) => {
  const title = formdata.get("title") as string;
  const description = formdata.get("description") as string;

  const user = await getUser();

  const userId = user?.id;

  await fetch(api + "/task", {
    method: "POST",
    headers: {
      SessionId: userId,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title, description }),
  });

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

export const updateTask = async (formdata: FormData, id: number) => {
  try {
    const data = Object.fromEntries(formdata);

    const user = await getUser();

    const userId = user?.id;

    if (!userId) return;

    await fetch(api + `/task/${id}`, {
      method: "PATCH",
      headers: {
        SessionId: user?.id,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...data }),
    });

    revalidatePath("/dashboard");
  } catch (error) {
    console.log("An error occured while updating task", { error });
  }
};

export const removeTask = async (id: number) => {
  try {
    const user = await getUser();

    const userId = user?.id;

    if (!userId) return;

    const response = await fetch(api + `/task/${id}`, {
      method: "DELETE",
      headers: {
        SessionId: user?.id,
        "Content-Type": "application/json",
      },
    });

    revalidatePath("/dashboard");
  } catch (error) {
    console.log("An error occured while updating task", { error });
  }
};
