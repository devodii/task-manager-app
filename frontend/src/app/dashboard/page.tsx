import { DashboardHeader } from "@/components/dashboard-header";
import { Tasks } from "@/components/tasks";
import * as React from "react";

export default async function DashboardPage() {
  return (
    <section className="p-6">
      <DashboardHeader />

      <div className="container flex flex-col gap-8 h-full mt-12 md:mt-20 w-screen items-center justify-center">
        <div className="text-2xl font-semibold">Tasks</div>

        <React.Suspense fallback={<div>Loading tasks..</div>}>
          <Tasks />
        </React.Suspense>
      </div>
    </section>
  );
}
