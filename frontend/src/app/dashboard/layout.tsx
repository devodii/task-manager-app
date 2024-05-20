import * as React from "react";

import { DashboardLayout as Layout } from "@/components/dashboard-layout";
import { getProfile } from "@/actions/profile";
import { getUser } from "@/actions/user";

interface Props {
  children: React.ReactNode;
}

export default async function DashboardLayout({ children }: Readonly<Props>) {
  const [profile, user] = await Promise.all([getProfile(), getUser()]);

  return (
    <Layout profile={profile?.data!} user={user}>
      {children}
    </Layout>
  );
}
