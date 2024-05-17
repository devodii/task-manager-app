"use server";

import { User } from "@/types";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const api = process.env.API_URL;

export const getUser = async (): Promise<User> => {
  try {
    const SessionId = cookies().get("merchant_id")?.value ?? "";

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

  if (!userId) {
    return { code: user?.statusCode, success: false };
  }

  cookies().set("merchant_id", userId, { maxAge: 1000 * 60 * 60 });

  redirect(`/onboarding?${next ? `next=${next}` : ""}`);
};

export const signIn = async (formdata: FormData) => {
  const dto = Object.fromEntries(formdata) as any;
  const next = formdata.get("next") as string;

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
      code: user?.statusCode,
    };
  }

  cookies().set("merchant_id", userId, { maxAge: 1000 * 60 * 60 });

  redirect(next?.length > 0 ? next : "/dashboard");
};

export const signOut = () => {
  cookies().delete("merchant_id");
  redirect("/");
};

export const signInAsFakeUser = async () => {
  const response = await fetch(api + "/auth/create-fake-user", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  const user = (await response.json()) as User;

  console.log({ user });

  cookies().set("merchant_id", user?.id, { maxAge: 1000 * 60 * 30 }); // 30 minutes

  if (user?.id) {
    redirect("/onboarding");
  }

  return user;
};

export const deleteFakeUser = async () => {
  const user = await getUser();

  const response = await fetch(api + "/auth/remove-fake-user", {
    method: "DELETE",

    body: JSON.stringify({ userId: user?.id }),
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  console.log({ response });

  cookies().delete("merchant_id");
  redirect("/");
};
