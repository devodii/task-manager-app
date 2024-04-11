"use server";

import { getUser } from "@/actions/user";
import { redirect } from "next/navigation";

export const createTask = async (formdata: FormData) => {
  const task = formdata.get("task") as string;

  const user = await getUser();

  if (!user?.id) {
    redirect("?auth=signIn");
  }

  return { object: "task.created", task };
};
