"use client";

import { cn } from "@/lib/utils";
import { Task } from "@/types";
import { useDrag } from "react-dnd";
import { CreateTask } from "./create-task";

import { DotsThree, PencilSimple } from "@phosphor-icons/react";

interface Props {
  task: Task;
}

export const TaskCard = ({ task }: Props) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "task-card",
    item: { ...task },
    collect: (window) => ({
      isDragging: !!window.isDragging(),
    }),
  }));

  return (
    <div
      className={cn(
        "w-64 h-36 bg-gray-100 px-4 py-2 border rounded-md space-y-2",
        isDragging ? "hidden" : ""
      )}
      ref={drag as any}
    >
      <nav className="flex w-full items-center gap-2 justify-end">
        <CreateTask metadata={task} action="edit">
          <PencilSimple className="size-5 cursor-pointer" />
        </CreateTask>
        <DotsThree className="size-6 cursor-grab" />
      </nav>

      <div className="flex flex-col gap-2">
        <span className="text-sm font-medium">{task?.title}</span>
        <span className="line-clamp-1">{task?.description}</span>
      </div>
    </div>
  );
};
