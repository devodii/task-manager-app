"use client";

import { cn } from "@/lib/utils";
import { Task } from "@/types";
import { useDrag } from "react-dnd";
import { AssigneeCard } from "./assignee-card";
import { CreateTask as EditTask } from "./create-task";

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
    <EditTask metadata={task} action="edit">
      <div
        className={cn(
          "w-full min-w-52 h-full bg-gray-100 px-4 py-2 border rounded-md space-y-2",
          isDragging ? "hidden" : ""
        )}
        ref={drag as any}
      >
        <div className="flex flex-col gap-2">
          <span className="text-sm font-medium line-clamp-2">
            {task?.title}
          </span>
          <span className="line-clamp-1 text-[13px]">{task?.description}</span>
        </div>

        {task?.assignee?.id && (
          <AssigneeCard
            name={task.assignee.profileName}
            url={task.assignee.profileImg}
            variant="sm"
          />
        )}
      </div>
    </EditTask>
  );
};
