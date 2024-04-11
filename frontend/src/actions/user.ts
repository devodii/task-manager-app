"use server";

import { redirect } from "next/navigation";

const api = process.env.API_URL;

export const getUser = async () => {
  try {
    const response = await fetch(api + "/auth/whoAmI", {
      method: "GET",
    });

    const user = await response.json();
    console.log({ user });
    return user;
  } catch (error) {
    console.log("An error occured while fetching user", { error });
  }
};

export const signUp = async (formdata: FormData) => {
  const dto = Object.fromEntries(formdata) as any;

  const response = await fetch(api + "/auth/signUp", {
    method: "POST",
    body: JSON.stringify({ ...dto }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const user = await response.json();

  if (!user?.data?.id) {
    // todo: handle errors
    console.log("an error occured.");
  }

  redirect("/dashboard");
};
