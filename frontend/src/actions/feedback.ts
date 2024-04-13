"use server";

const api = process.env.API_URL;

export const sendFeedback = async (formdata: FormData) => {
  const message = formdata.get("message") as string;

  const response = await fetch(api + "/feedback", {
    method: "POST",
    body: JSON.stringify({ message }),
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  const feedback = await response.json();

  return feedback;
};
