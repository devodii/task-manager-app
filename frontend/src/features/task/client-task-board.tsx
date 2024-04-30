"use client";

import { useTask } from "@/contexts/task-context";
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

  const { setTodo, setInProgress, setDone } = useTask();

  React.useEffect(() => {
    setTodo(tasksInTodo);
    setInProgress(tasksInProgress);
    setDone(accomplishedTasks);
  }, [props]);

  return (
    <div className="grid grid-cols-3 w-full border gap-4">
      <Todos />

      <TasksInProgress />

      <AccomplishedTasks />
    </div>
  );
};
