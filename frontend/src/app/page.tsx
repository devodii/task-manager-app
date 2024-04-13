import { mockCreateTask } from "@/actions/task";
import { getUser, signIn, signUp } from "@/actions/user";
import { AuthForm } from "@/components/auth-form";
import { SubmitButton } from "@/components/submit-button";
import { Button } from "@ui/button";
import { Input } from "@ui/input";
import Link from "next/link";

interface Props {
  searchParams: {
    auth: "signIn" | "signUp";
  };
}

export default async function Index({ searchParams }: Props) {
  const user = await getUser();
  return (
    <div className="container flex flex-col items-center gap-4 my-12">
      <header className="w-full flex items-center justify-between">
        <div className="text-xl font-medium">Task Manager</div>
        {user?.id ? (
          <Button variant="outline" asChild>
            <Link href={"/dashboard"}>Dashboard</Link>
          </Button>
        ) : (
          <AuthForm>
            <Button variant="outline">Sign in</Button>
          </AuthForm>
        )}
      </header>

      <h2 className="text-4xl md:text-5xl font-semibold mt-24 text-center">
        Better productivity ahead
      </h2>
      <p className="text-xl text-center">You set your task and achieve it.</p>

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

      {searchParams.auth === "signIn" && (
        <AuthForm variant="sign-in" open action={signIn} />
      )}

      {searchParams.auth === "signUp" && (
        <AuthForm variant="sign-up" open action={signUp} />
      )}
    </div>
  );
}
