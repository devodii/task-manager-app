"use server";

import { getUser } from "@/actions/user";
import { Task } from "@/types";
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
  const task = formdata.get("task") as string;
};

export const getTasks = async (): Promise<Task[] | []> => {
  try {
    const user = await getUser();

    const userId = user?.id;

    if (!userId) return [];

    const response = await fetch(api + "/task", {
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
