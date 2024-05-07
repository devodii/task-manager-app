import { getUser } from "./user";

const api = process.env.API_URL;

export const getTeams = async () => {
  try {
    const user = await getUser();

    if (!user?.id) return;

    const response = await fetch(api + "/team", {
      headers: {
        SessionId: user?.id ?? "",
        "Content-Type": "application/json",
      },
    });

    const teams: any = await response.json();

    return teams;
  } catch (error) {
    console.log("An error occured while fetching workspace", { error });
    return {} as unknown as any;
  }
};
