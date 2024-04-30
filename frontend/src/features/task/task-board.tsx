import { getTasks } from "@/actions/task";
import { ClientTaskBoard } from "./client-task-board";

export const TaskBoard = async () => {
  const tasks = await getTasks();

  const tasksInTodo = tasks.filter((task) => task.status == "todo");
  const tasksInProgress = tasks.filter((task) => task.status == "in_progress");
  const accomplishedTasks = tasks.filter((task) => task.status == "done");

  return (
    <ClientTaskBoard
      tasksInTodo={tasksInTodo}
      tasksInProgress={tasksInProgress}
      accomplishedTasks={accomplishedTasks}
    />
  );
};
