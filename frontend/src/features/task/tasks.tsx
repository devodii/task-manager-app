import { getTasks } from "@/actions/task";
import { EmptyTasks } from "./empty-tasks";
import { TaskCard } from "./task-card";

export const Tasks = async () => {
  const tasks = await getTasks();

  console.log({ tasks });
  if (!tasks?.length) return <EmptyTasks />;

  return (
    <ul className="w-full grid grid-cols-1 gap-4">
      {tasks.map((task) => (
        <TaskCard task={task} key={task.id} />
      ))}
    </ul>
  );
};
