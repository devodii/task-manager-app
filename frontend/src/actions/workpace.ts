"use server";

import { Workspace, WorkspaceMember } from "@/types";
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

  revalidatePath("/dashboard", "layout");

  console.log({ workspace });

  if (workspace?.id) {
    redirect("/dashboard/workspace");
  }

  if (!workspace?.id) {
    return { success: false };
  }
};

export const updateWorkspace = async (id: string, name: string) => {
  try {
    const user = await getUser();

    if (!user?.id) return;

    const response = await fetch(api + `/workspace/${id}`, {
      headers: {
        SessionId: user?.id ?? "",
        "Content-Type": "application/json",
      },
      method: "PATCH",
      body: JSON.stringify({ id, name }),
    });

    const workspace: Workspace = await response.json();

    console.log({ workspace });

    revalidatePath("/dashboard/workspace");

    return { success: true };
  } catch (error) {
    console.log("An error occured while updating workspace", { error });
    return { success: false };
  }
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

export const findWorkspace = async (workspaceId: string) => {
  try {
    const response = await fetch(api + `/workspace/${workspaceId}`, {
      headers: {
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

export const joinWorkspace = async (workspaceId: string) => {
  const user = await getUser();

  const response = await fetch(api + `/workspace/join/${workspaceId}`, {
    method: "PATCH",
    headers: {
      SessionId: user?.id ?? "",
      "Content-Type": "application/json",
    },
  });

  const memberAddedToWorkspace = await response.json();

  if (!memberAddedToWorkspace?.success) return;

  revalidatePath("/dashboard/teams");

  redirect("/dashboard/teams");
};

export const getWorkspaceMembers = async (workspaceId: string) => {
  try {
    const response = await fetch(
      api + `/workspace/members?workspaceId=${workspaceId}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const members: WorkspaceMember[] = (await response.json()) ?? [];

    return members;
  } catch (error) {
    console.log("An error occured while fetching workspace", { error });
    return {} as unknown as WorkspaceMember[];
  }
};
