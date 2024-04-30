import { useTask } from "@/contexts/task-context";
import { Droppable } from "./droppable";
import { TaskCard } from "./task-card";
import { nanoid } from "nanoid";

export const TasksInProgress = () => {
  const { inProgress } = useTask();

  return (
    <Droppable key={`board_${nanoid()}`} destination="in_progress">
      <b className="text-xl font-semibold">In progress</b>
      <ul className="grid grid-cols-1 gap-4">
        {inProgress?.map((el: any) => (
          <TaskCard task={el} key={el.id} />
        ))}
      </ul>
    </Droppable>
  );
};
