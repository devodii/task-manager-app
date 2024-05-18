import * as React from "react";

import { getUser } from "@/actions/user";
import { Button } from "@ui/button";
import Link from "next/link";
import { IoLogoGithub } from "react-icons/io5";

export const HomeLayout = async ({ children }: React.PropsWithChildren) => {
  const user = await getUser();

  return (
    <div className="h-screen w-screen bg-[#F2F8FB] overflow-y-auto">
      <div className="container flex flex-col items-center gap-4 my-12">
        <header className="w-full flex items-center justify-between">
          <Link href={"/"} className="text-xl font-medium">
            Task Manager
          </Link>

          <div className="w-full md:w-2/5 border h-full bg-white rounded-full py-2 px-6">
            <Link
              href="/changelog"
              className="font-semibold text-gray-700 hover:text-gray-900 text-[14px] hover:underline hover:underline-offset-[4px]"
            >
              Changelog
            </Link>
          </div>

          <div className="flex items-center gap-2">
            {user?.id ? (
              <Button variant="outline" asChild>
                <Link href={"/dashboard"}>Dashboard</Link>
              </Button>
            ) : (
              <Button asChild variant={"outline"}>
                <Link href={"/sign-in"}>Sign in</Link>
              </Button>
            )}

            <Link
              href="https://github.com/devodii/task-manager-app"
              target="_blank"
              className="group flex items-center gap-1 hover:bg-gray-200 hover:rounded-md p-2"
            >
              <IoLogoGithub className="text-xl md:text-2xl" />
            </Link>
          </div>
        </header>

        {children}
      </div>
    </div>
  );
};
