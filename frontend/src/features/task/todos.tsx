import { useTask } from "@/contexts/task-context";
import { TaskCard } from "./task-card";
import { Droppable } from "./droppable";
import { nanoid } from "nanoid";

export const Todos = () => {
  const { todo } = useTask();

  return (
    <Droppable destination="todo" key={`drop_${nanoid()}`}>
      <b className="text-xl font-semibold">Todo</b>
      <ul className="grid grid-cols-1 gap-4">
        {todo?.map((el: any) => (
          <TaskCard task={el} key={el.id} />
        ))}
      </ul>
    </Droppable>
  );
};
