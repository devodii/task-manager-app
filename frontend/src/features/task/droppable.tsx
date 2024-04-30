"use client";

import { useTask } from "@/contexts/task-context";
import { cn } from "@/lib/utils";
import { Task, TaskStatus } from "@/types";
import { nanoid } from "nanoid";
import * as React from "react";
import { useDrop } from "react-dnd";

interface Props {
  children: React.ReactNode;
  destination: TaskStatus;
}

export const Droppable = ({ children, destination }: Props) => {
  const { moveTaskToBoard } = useTask();

  const [{ isOver }, drop] = useDrop(() => ({
    accept: "task-card",
    drop: (item: Task) => {
      console.log({ from: item.status, to: destination, id: item.id });
      moveTaskToBoard({ from: item.status, to: destination, id: item.id });
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
      {children}
    </section>
  );
};
