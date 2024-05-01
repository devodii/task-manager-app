import { useTask } from "@/contexts/task-context";
import { nanoid } from "nanoid";
import { Droppable } from "./droppable";
import { TaskCard } from "./task-card";

export const TasksInProgress = () => {
  const { inProgress } = useTask();

  return (
    <Droppable
      key={`board_${nanoid()}`}
      board="in_progress"
      label="In progress"
    >
      <ul className="grid grid-cols-1 gap-4">
        {inProgress?.map((el: any) => (
          <TaskCard task={el} key={`id_${nanoid()}`} />
        ))}
      </ul>
    </Droppable>
  );
};
