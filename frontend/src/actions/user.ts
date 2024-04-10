"use server";

const api = process.env.API_URL;

export const getUser = async () => {
  try {
    const response = await fetch(api + "/me", {
      method: "GET",
    });

    const user = await response.json();
    return user;
  } catch (error) {
    console.log("An error occured while fetching user", { error });
  }
};
