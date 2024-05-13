"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Task } from "@/types";
import { useDrag } from "react-dnd";
import { AssigneeCard } from "./assignee-card";
import { CreateTask as EditTask } from "./create-task";
import { AiOutlineDelete } from "react-icons/ai";
import { DeleteTask } from "./delete-task";
import { removeTask } from "@/actions/task";

interface Props {
  task: Task;
}

export const TaskCard = ({ task }: Props) => {
  const [isHovered, setIsHovered] = React.useState(false);

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
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="w-full flex flex-col gap-2">
          <div className="flex flex-1 justify-between items-center">
            <span className="text-sm font-medium line-clamp-2">
              {task?.title}
            </span>

            <div onClick={(e) => e.stopPropagation()}>
              {isHovered && (
                <DeleteTask onDelete={() => removeTask(task.id)}>
                  <AiOutlineDelete size={14} />
                </DeleteTask>
              )}
            </div>
          </div>
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
