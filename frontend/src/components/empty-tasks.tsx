import { CreateTask } from "./create-task";
import { Button } from "./ui/button";

export const EmptyTasks = () => {
  return (
    <div className="font-medium text-black flex  flex-col gap-2 items-center justify-center w-full">
      <span> It is a bit empty here.</span>
      <span>When you create a task, youd find it here.</span>

      <CreateTask>
        <Button>Create task</Button>
      </CreateTask>
    </div>
  );
};
