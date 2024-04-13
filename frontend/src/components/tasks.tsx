import { getTasks } from "@/actions/task";

export const Tasks = async () => {
  const tasks = await getTasks();

  return <div>{JSON.stringify(tasks)}</div>;
};
