"use server";

import { getUser } from "./user";

const api = process.env.API_URL;

export const sendFeedback = async (formdata: FormData) => {
  const user = await getUser();

  const message = formdata.get("message") as string;

  const response = await fetch(api + "/feedback", {
    method: "POST",
    body: JSON.stringify({ message }),
    headers: {
      SessionId: user.id ?? null,
      "Content-Type": "application/json",
    },
    credentials: "same-origin",
  });

  const feedback = await response.json();

  return feedback;
};
