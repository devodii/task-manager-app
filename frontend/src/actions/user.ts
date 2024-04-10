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

export const signUp = async (formdata: FormData) => {
  const dto = Object.fromEntries(formdata);

  try {
    const response = await fetch("http://localhost:3005/auth/signUp", {
      method: "POST",
      body: JSON.stringify({ ...dto }),
    });

    const user = await response.json();

    console.log({ user });
    return user;
  } catch (error) {
    console.log("An error occuredwhile signing user up", { error });
  }
};
