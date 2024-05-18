"use server";

export const getRepoStats = async (): Promise<{ stars: number }> => {
  const response = await fetch(
    "https://api.github.com/repos/devodii/task-manager-app",
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  const repo = await response.json();

  return { stars: repo.stargazers_count };
};
