import { getUser } from "@/actions/user";
import { AnonymousAuthButton } from "@/components/anonymous-auth-button";
import { Footer } from "@/components/footer";
import { Button } from "@ui/button";
import Link from "next/link";

export default async function Index() {
  const user = await getUser();

  return (
    <div className="h-screen w-screen bg-[#F2F8FB] overflow-y-auto">
      <div className="container flex flex-col items-center gap-4 my-12">
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
          The #1 Task Management platform.
        </h2>

        <div className="space-y-1 max-w-2xl font-medium">
          <p className="text-md text-center">
            Task Manager is an open source Linear alternative
          </p>
          <p className="text-md text-center">
            The #1 task management tool that helps you and your teammates work
            asynchronously. Create or join a workspace, create and assign tasks
            to members of a workspace, and lot more.
          </p>
        </div>

        {user?.id ? (
          <div className="w-full max-w-3xl mx-auto flex items-center justify-center">
            <Button asChild className="w-full">
              <Link href={"/dashboard"}>Go to dashboard</Link>
            </Button>
          </div>
        ) : (
          <div className="w-full max-w-3xl mx-auto flex items-center justify-center">
            <AnonymousAuthButton />
          </div>
        )}

        <Footer />
      </div>
    </div>
  );
}
