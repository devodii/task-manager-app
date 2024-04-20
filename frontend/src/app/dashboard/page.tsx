import { DashboardHeader } from "@/components/dashboard-header";
import { SendFeedback } from "@/components/send-feedback";
import { CreateTask } from "@task/create-task";
import { Tasks } from "@task/tasks";
import * as React from "react";

interface Props {
  searchParams: {
    task: string;
  };
}

export default async function DashboardPage({ searchParams }: Props) {
  return (
    <section className="py-6 md:px-6">
      <DashboardHeader />

      <div className="container flex flex-col gap-8 h-full mt-12 md:mt-20 w-screen items-center justify-center mx-auto">
        <div className="text-2xl font-semibold">Tasks</div>

        <React.Suspense fallback={<div>Loading tasks..</div>}>
          <Tasks />
        </React.Suspense>
      </div>

      {searchParams?.task?.length > 1 && <CreateTask defaultOpen={true} />}

      <SendFeedback />
    </section>
  );
}
