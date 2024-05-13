import { mockCreateTask } from "@/actions/task";
import { getUser } from "@/actions/user";
import { SubmitButton } from "@/components/submit-button";
import { Button } from "@ui/button";
import { Input } from "@ui/input";
import Link from "next/link";
import { IoLogoGithub } from "./client";
import { TryAnonymously } from "@/components/fake-user-button";

export default async function Index() {
  const user = await getUser();

  return (
    <div className="container flex flex-col items-center gap-4 my-12 bg-[var(--foreground)]">
      <header className="w-full flex items-center justify-between">
        <div className="text-xl font-medium">Task Manager</div>
        {user?.id ? (
          <Button variant="outline" asChild>
            <Link href={"/dashboard"}>Dashboard</Link>
          </Button>
        ) : (
          <Button asChild variant={"outline"}>
            <Link href={"/sign-in"}>Sign in</Link>
          </Button>
        )}
      </header>

      <h2 className="text-4xl md:text-5xl font-semibold mt-24 text-center">
        Better productivity ahead
      </h2>
      <p className="text-xl text-center">The open source linear alternative</p>

      <form
        className="flex items-center flex-wrap gap-4 w-full max-w-4xl"
        action={mockCreateTask}
      >
        <Input
          className="w-full md:w-4/5 placeholder:text-md text-md"
          name="task"
          placeholder="Add authentication..."
          required
        />
        <SubmitButton className="flex-1 py-5">Set task</SubmitButton>
      </form>

      <Link href="https://github.com/devodii/task-manager-app" target="_blank">
        <IoLogoGithub className="text-4xl" />
      </Link>

      <TryAnonymously />
    </div>
  );
}
