"use client";

import { useTask } from "@/contexts/task-context";
import { cn } from "@/lib/utils";
import { Task, TaskStatus } from "@/types";
import * as React from "react";
import { useDrop } from "react-dnd";

interface Props {
  children: React.ReactNode;
  board: TaskStatus;
  label: string;
}

export const Droppable = ({ children, board, label }: Props) => {
  const { moveTaskToBoard } = useTask();

  const [{ isOver }, drop] = useDrop(() => ({
    accept: "task-card",
    drop: (item: Task) => {
      moveTaskToBoard({ from: item.status, to: board, id: item.id });
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  return (
    <section
      className={cn(
        "flex flex-col gap-2 items-center",
        isOver ? "bg-red-500" : ""
      )}
      ref={drop as any}
    >
      <b className="text-xl mb-4 font-semibold">{label}</b>
      <>{children}</>
    </section>
  );
};
