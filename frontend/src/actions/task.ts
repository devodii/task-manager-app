"use server";

import { getUser } from "@/actions/user";
import { Task } from "@/types";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getWorkspace } from "./workpace";

const api = process.env.API_URL;

export const mockCreateTask = async (formdata: FormData) => {
  const user = await getUser();

  const task = formdata.get("task") as string;

  if (!user?.id) {
    redirect("/sign-in");
  }

  redirect(`/dashboard/workspace?task=${task}`);
};

export const createTask = async (formdata: FormData) => {
  const title = formdata.get("title") as string;
  const description = formdata.get("description") as string;
  const assigneeName = formdata.get("assigneeName") as string;
  const assigneeImg = formdata.get("assigneeImg") as string;

  const workspaceId = formdata.get("workspaceId");

  const user = await getUser();

  const userId = user?.id;

  await fetch(api + "/task", {
    method: "POST",
    headers: {
      SessionId: userId ?? "",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title,
      description,
      workspaceId: workspaceId ?? null,
      assignee: {
        profileName: assigneeName ?? "",
        profileImg: assigneeImg ?? "",
      },
    }),
  });

  revalidatePath("/dashboard", "page");
  return { success: true };
};

export const getTasks = async (): Promise<Task[] | []> => {
  try {
    const user = await getUser();

    const userId = user?.id;

    if (!userId) return [];

    const response = await fetch(api + "/task", {
      method: "GET",
      headers: {
        SessionId: user?.id ?? "",
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
    const taskId = formdata.get("taskId") as string;
    const assigneeId = formdata.get("assigneeId") as string;
    const title = formdata.get("title") as string;
    const description = formdata.get("description") as string;
    const assigneeName = formdata.get("assigneeName") as string;
    const assigneeImg = formdata.get("assigneeImg") as string;
    const status = formdata.get("status") as string;

    const user = await getUser();

    const userId = user?.id;

    if (!userId) return;

    const response = await fetch(api + `/task/${id}`, {
      method: "PATCH",
      headers: {
        SessionId: user?.id ?? "",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: taskId,
        title,
        description,
        assignee: {
          id: assigneeId,
          profileName: assigneeName ?? "",
          profileImg: assigneeImg ?? "",
        },
        status,
      }),
    });

    const task = await response.json();

    if (!task?.id) {
      return { success: false };
    }

    revalidatePath("/dashboard/workspace");
    return { success: true };
  } catch (error) {
    console.log("An error occured while updating task", { error });
  }
};

export const removeTask = async (id: string) => {
  try {
    const user = await getUser();

    const userId = user?.id;

    if (!userId) return;

    await fetch(api + `/task/${id}`, {
      method: "DELETE",
      headers: {
        SessionId: user?.id ?? "",
        "Content-Type": "application/json",
      },
    });

    revalidatePath("/dashboard/workspace");
  } catch (error) {
    console.log("An error occured while updating task", { error });
  }
};

export const getWorkspaceTasks = async (workspaceId: string) => {
  try {
    const user = await getUser();

    const userId = user?.id;

    if (!userId) return [];

    const response = await fetch(
      api + `/task/workspace?workspaceId=${workspaceId}`,
      {
        method: "GET",
        headers: {
          SessionId: user?.id ?? "",
        },
      }
    );

    const tasks = await response.json();

    return tasks as Task[];
  } catch (error) {
    console.log("An error occured while fetching tasks", { error });
    return [];
  }
};
