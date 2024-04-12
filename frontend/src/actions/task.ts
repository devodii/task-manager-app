"use server";

import { getUser } from "@/actions/user";
import { redirect } from "next/navigation";

export const mockCreateTask = async (formdata: FormData) => {
  const user = await getUser();

  if (!user?.id) {
    redirect("?auth=signIn");
  }

  redirect("/dashboard?createTask=true");
};

export const createTask = async (formdata: FormData) => {
  const task = formdata.get("task") as string;

  console.log("task created");
};
