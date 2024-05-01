import { useTask } from "@/contexts/task-context";
import { TaskCard } from "./task-card";
import { Droppable } from "./droppable";
import { nanoid } from "nanoid";

export const Todos = () => {
  const { todo } = useTask();

  return (
    <Droppable board="todo" label="Todo" key={`drop_${nanoid()}`}>
      <ul className="grid grid-cols-1 gap-4">
        {todo?.map((el: any) => (
          <TaskCard task={el} key={`id_${nanoid()}`} />
        ))}
      </ul>
    </Droppable>
  );
};
