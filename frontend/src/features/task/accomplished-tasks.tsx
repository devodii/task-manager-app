import { TaskCard } from "./task-card";

import { useTask } from "@/contexts/task-context";
import { nanoid } from "nanoid";
import { Droppable } from "./droppable";

export const AccomplishedTasks = () => {
  const { done } = useTask();

  return (
    <Droppable key={`board_${nanoid()}`} destination="done">
      <b className="text-xl font-semibold">Done</b>
      <ul className="grid grid-cols-1 gap-4">
        {done?.map((el: any) => (
          <TaskCard task={el} key={`id_${nanoid()}`} />
        ))}
      </ul>
    </Droppable>
  );
};
