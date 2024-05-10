import { TaskCard } from "./task-card";

import { useTask } from "@/hooks/use-task";
import { nanoid } from "nanoid";
import { Droppable } from "./droppable";

export const AccomplishedTasks = () => {
  const { done: tasks } = useTask();

  return (
    <Droppable key={`drop${nanoid()}`} board="done" label="Done">
      <ul className="grid grid-cols-1 gap-4">
        {tasks?.map((el: any) => (
          <TaskCard task={el} key={`id_${nanoid()}`} />
        ))}
      </ul>
    </Droppable>
  );
};
