"use client";

// todo: fix types.
import { parseElementsContext } from "@/lib/context";
import { ActionType, Task, TaskStatus } from "@/types";
import * as React from "react";

type ICases =
  | "task.updateAll"
  | "task.updateTodo"
  | "task.updateInProgress"
  | "task.updateDone";

// @ts-ignore
const TaskContext = React.createContext<any>();

const initialState: any = {
  todo: [] as Task[],
  inProgress: [] as Task[],
  done: [] as Task[],
};

const reducer = (
  state: typeof initialState,
  action: ActionType<ICases, any>
) => {
  const { type, payload } = action;
  switch (type) {
    case "task.updateAll":
      return payload;

    case "task.updateTodo":
      return { ...state, todo: payload };

    case "task.updateInProgress":
      return { ...state, inProgress: payload };

    case "task.updateDone":
      return { ...state, done: payload };

    default:
      throw new Error("unknow action type!");
  }
};

const TaskProvider = ({ children }: React.PropsWithChildren) => {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  const { todo, inProgress, done } = state as typeof initialState;

  const getBoard = (status: TaskStatus) => {
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

  const setBoard = (status: TaskStatus, data: any) => {
    switch (status) {
      case "todo":
        dispatch({ type: "task.updateTodo", payload: data });
        break;
      case "in_progress":
        dispatch({ type: "task.updateInProgress", payload: data });
        break;
      case "done":
        dispatch({ type: "task.updateDone", payload: data });
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
    /**
     * What?
     *
     * 1. finds the task in the previous board and remove it from that board.
     * 2. Adds the task to the new board
     */
    const fromBoard = getBoard(from);
    const taskToMove = fromBoard.find((el: Task) => el.id == id)!;
    const updatedTaskToMove = { ...taskToMove, status: to };

    if (!taskToMove) {
      console.error(`Task with ID ${id} not found in ${from} board`);
      return;
    }

    const updatedFromBoard = fromBoard.filter((task: Task) => task.id != id);
    setBoard(from, updatedFromBoard);

    const toBoard = getBoard(to);
    const updatedToBoard = [...toBoard, updatedTaskToMove];
    setBoard(to, updatedToBoard);
  };

  return (
    <TaskContext.Provider
      value={{
        todo,
        inProgress,
        done,
        dispatch,
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
