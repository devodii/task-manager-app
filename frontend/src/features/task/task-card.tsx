"use client";

import * as React from "react";
import { Task } from "@/types";
import { useDrag } from "react-dnd";
import { MdDragIndicator } from "react-icons/md";
import { CreateTask } from "./create-task";

interface Props {
  task: Task;
}

export const TaskCard = ({ task }: Props) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "task-card",
    collect: (window) => ({
      isDragging: !!window.isDragging(),
    }),
  }));

  console.log({ task });
  return (
    <div
      className="w-64 h-36 bg-gray-100 px-4 py-2 border rounded-md space-y-2"
      ref={drag as any}
    >
      <nav className="flex w-full items-end justify-end">
        <MdDragIndicator className="size-6 cursor-grab" />
      </nav>

      <div className="flex flex-col gap-2">
        <span className="text-sm font-medium">{task?.title}</span>
        <span className="line-clamp-1">{task?.description}</span>
      </div>

      <CreateTask metadata={task} action="edit">
        edit
      </CreateTask>
    </div>
  );
};
