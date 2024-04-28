import * as React from "react";
import { DashboardLayout as Layout } from "@/components/dashboard-layout";

interface Props {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: Readonly<Props>) {
  return <Layout>{children}</Layout>;
}
