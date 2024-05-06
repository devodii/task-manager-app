import { getTasks, getWorkspaceTasks } from "@/actions/task";
import { ClientTaskBoard } from "./client-task-board";

interface Props {
  isOwner?: boolean;
  workspaceId?: string;
}

export const TaskBoard = async ({ isOwner, workspaceId }: Props) => {
  const tasks = isOwner
    ? await getTasks()
    : await getWorkspaceTasks(workspaceId!);

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
