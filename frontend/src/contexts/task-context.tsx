"use client";

// todo: fix types.
import { parseElementsContext } from "@/lib/context";
import { Task, TaskStatus } from "@/types";
import * as React from "react";

// @ts-ignore
const TaskContext = React.createContext<any>();

const TaskProvider = ({ children }: React.PropsWithChildren) => {
  const [todo, setTodo] = React.useState<Task[]>([]);
  const [inProgress, setInProgress] = React.useState<Task[]>([]);
  const [done, setDone] = React.useState<Task[]>([]);

  const getTab = (status: TaskStatus) => {
    switch (status) {
      case "todo":
        return todo;
      case "in_progress":
        return inProgress;
      case "done":
        return done;
      default:
        throw new Error(`Invalid status: ${status}`);
    }
  };

  const setTab = (status: TaskStatus, data: any) => {
    switch (status) {
      case "todo":
        setTodo(data);
        break;
      case "in_progress":
        setInProgress(data);
        break;
      case "done":
        setDone(data);
        break;
    }
  };

  const moveTaskToBoard = ({
    from,
    to,
    id,
  }: {
    from: TaskStatus;
    to: TaskStatus;
    id: number;
  }) => {
    console.log({ from });
    const tab = getTab(from);
    const task = tab.find((el) => el.id == id)!;

    const fil = tab.filter((task) => task.id != id);

    console.log({ task, id, fil, tab });

    /**
     * Add the task to the new board.
     */
    setTab(to, (prev) => [...prev, task]);

    /**
     * Removes the task from the previous board
     */
    setTab(
      from,
      tab.filter((task) => task.id != id)
    );
  };

  return (
    <TaskContext.Provider
      value={{
        todo,
        inProgress,
        done,
        setTodo,
        setInProgress,
        setDone,
        moveTaskToBoard,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

const useTask = () => {
  const context = React.useContext(TaskContext);
  return parseElementsContext(context, "task context");
};

export { TaskProvider, useTask };
