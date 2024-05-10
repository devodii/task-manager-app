"use server";

import { getUser } from "./user";

const api = process.env.API_URL;

export const sendFeedback = async (formdata: FormData) => {
  try {
    const user = await getUser();

    const message = formdata.get("message") as string;
    const path = formdata.get("path") as string;

    const response = await fetch(api + "/feedback", {
      method: "POST",
      body: JSON.stringify({ message: `${message}  & path=${path}` }),
      headers: {
        SessionId: user.id ?? null,
        "Content-Type": "application/json",
      },
      credentials: "same-origin",
    });

    const feedback = await response.json();

    if (feedback.id) {
      return { success: true };
    }
  } catch (error) {
    return { success: false };
  }
};
