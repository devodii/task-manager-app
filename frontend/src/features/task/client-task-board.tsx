"use client";

import { useTask } from "@/hooks/use-task";
import { Task } from "@/types";
import * as React from "react";
import { AccomplishedTasks } from "./accomplished-tasks";
import { TasksInProgress } from "./tasks-in-progress";
import { Todos } from "./todos";
import { Skeleton } from "@/components/ui/skeleton";

interface Props {
  [key: string]: Task[];
}

export const ClientTaskBoard = (props: Props) => {
  const { tasksInTodo, tasksInProgress, accomplishedTasks } = props;

  const { dispatch, isLoading } = useTask();

  React.useEffect(() => {
    dispatch({
      type: "task.updateAll",
      payload: {
        todo: tasksInTodo,
        inProgress: tasksInProgress,
        done: accomplishedTasks,
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tasksInTodo, tasksInProgress, accomplishedTasks]);

  if (
    tasksInTodo.length < 1 &&
    tasksInProgress.length < 1 &&
    accomplishedTasks.length < 1
  )
    return <div className="mt-4">This workspace does not have any task</div>;

  if (isLoading) {
    return (
      <div className="grid grid-cols-3 w-full max-w-3xl gap-4">
        {Array.from({ length: 3 }, (_el, i) => (
          <Skeleton key={i} className="h-32 w-full" />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-3 w-full max-w-3xl gap-4">
      <Todos />
      <TasksInProgress />
      <AccomplishedTasks />
    </div>
  );
};
