"use client";

import { Task } from "@/types";
import { FiEdit2 } from "react-icons/fi";
import { AiOutlineDelete } from "react-icons/ai";
import { CreateTask } from "./create-task";
import { removeTask } from "@/actions/task";
import { DeleteTask } from "./delete-task";

interface Props {
  task: Task;
}

export const TaskCard = ({ task }: Props) => {
  return (
    <div className="w-full bg-gray-100 py-6 px-12 border rounded-md flex items-center justify-between">
      <div className="flex flex-col gap-2">
        <span className="text-xl font-medium">{task.title}</span>
        <span className="line-clamp-1">{task?.description}</span>
      </div>

      <div className="flex items-center gap-4">
        <CreateTask action="edit" metadata={task}>
          <FiEdit2 className="text-xl cursor-pointer" />
        </CreateTask>
        <DeleteTask onDelete={() => removeTask(task.id)}>
          <AiOutlineDelete className="text-xl cursor-pointer" />
        </DeleteTask>
      </div>
    </div>
  );
};
