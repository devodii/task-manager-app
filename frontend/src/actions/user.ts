"use server";

import { User } from "@/types";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const api = process.env.API_URL;

export const getUser = async (): Promise<User> => {
  try {
    const SessionId = cookies().get("task-manager.session")?.value ?? "";

    const response = await fetch(api + "/auth/whoAmI", {
      method: "GET",
      headers: {
        SessionId,
      },
      credentials: "include",
    });

    const user = await response.json();

    return user;
  } catch (error) {
    console.log("An error occured while fetching user", { error });
    return {} as any;
  }
};

export const signUp = async (formdata: FormData) => {
  const dto = Object.fromEntries(formdata) as any;
  const next = formdata.get("next") as string;

  const response = await fetch(api + "/auth/signUp", {
    method: "POST",
    body: JSON.stringify({ ...dto }),
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "same-origin",
  });

  const user = await response.json();

  const userId = user?.data?.id;

  if (user?.statusCode == 400) {
    return { success: false, message: "This email is already in use" };
  }

  if (!userId) {
    return { success: false, message: "An unexpected error occured" };
  }

  cookies().set("task-manager.session", userId, { maxAge: 1000 * 60 * 60 });

  redirect(`/onboarding?${next ? `next=${next}` : ""}`);
};

export const signIn = async (formdata: FormData) => {
  const dto = Object.fromEntries(formdata) as any;
  const next = formdata.get("next") as string;

  console.log({ next });

  const response = await fetch(api + "/auth/signIn", {
    method: "POST",
    body: JSON.stringify({ ...dto }),
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  const user = await response.json();

  const userId = user?.data?.id;

  if (!userId) {
    return {
      success: false,
      message: "Incorrect credentials!",
      possibleFix: "Try signing up if you do not have an account already",
    };
  }

  cookies().set("task-manager.session", userId, { maxAge: 1000 * 60 * 60 });

  redirect(!!next?.length ? next : "/dashboard");
};

export const signOut = () => {
  cookies().delete("task-manager.session");
  redirect("/");
};
