import { getTasks } from "@/actions/task";
import { EmptyTasks } from "./empty-tasks";

export const Tasks = async () => {
  const tasks = await getTasks();

  if (!tasks?.length) return <EmptyTasks />;

  return <div>{JSON.stringify(tasks)}</div>;
};
