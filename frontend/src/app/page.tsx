import { createTask } from "@/actions/task";
import { getUser } from "@/actions/user";
import { AuthForm } from "@/components/AuthForm";
import { Button } from "@ui/button";
import { Input } from "@ui/input";

interface Props {
  searchParams: {
    requiresAuth: string;
  };
}

export default async function Index({ searchParams }: Props) {
  const user = await getUser();

  return (
    <div className="min-h-screen container flex flex-col items-center justify-center gap-4">
      <h2 className="text-4xl md:text-5xl font-semibold">
        Better productivity ahead
      </h2>
      <p className="text-xl">You set your task and achieve it.</p>

      <form
        className="flex items-center flex-wrap gap-4 w-full max-w-4xl"
        action={createTask}
      >
        <Input
          className="w-4/5 placeholder:text-md text-md"
          name="task"
          placeholder="Add authentication..."
        />
        <Button className="flex-1 py-5">Set task</Button>
      </form>

      {searchParams.requiresAuth && <AuthForm variant="sign-in" open />}
    </div>
  );
}
