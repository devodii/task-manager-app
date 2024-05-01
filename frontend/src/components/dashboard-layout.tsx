import * as React from "react";
import { DashboardHeader } from "@/components/dashboard-header";
import { DashboardSidebar } from "./dashboard-sidebar";

export const DashboardLayout = ({ children }: React.PropsWithChildren) => {
  return (
    <section className="py-6 md:px-6 px-4">
      <DashboardHeader />

      <div className="w-full flex gap-12 px-24 md:mt-12">
        <DashboardSidebar />
        <>{children}</>
      </div>
    </section>
  );
};
