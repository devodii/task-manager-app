"use client";

import { useTask } from "@/contexts/task-context";
import { socket } from "@/lib/socket";
import { Task } from "@/types";
import * as React from "react";
import { AccomplishedTasks } from "./accomplished-tasks";
import { TasksInProgress } from "./tasks-in-progress";
import { Todos } from "./todos";

interface Props {
  [key: string]: Task[];
}

export const ClientTaskBoard = (props: Props) => {
  const { tasksInTodo, tasksInProgress, accomplishedTasks } = props;

  const { dispatch } = useTask();

  React.useEffect(() => {
    dispatch({
      type: "task.updateAll",
      payload: {
        todo: tasksInTodo,
        inProgress: tasksInProgress,
        done: accomplishedTasks,
      },
    });

    socket.emit("hello", { name: "Emmanuel" }, (res: any) => {
      console.log({ res });
    });
  }, [props]);

  return (
    <div className="grid grid-cols-3 w-full border gap-4">
      <Todos />
      <TasksInProgress />
      <AccomplishedTasks />
    </div>
  );
};
