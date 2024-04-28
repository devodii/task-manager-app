import * as React from "react";
import { DashboardHeader } from "@/components/dashboard-header";

export const DashboardLayout = ({ children }: React.PropsWithChildren) => {
  return (
    <section className="py-6 md:px-6 px-4">
      <DashboardHeader />

      <>{children}</>
    </section>
  );
};
