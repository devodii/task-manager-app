import * as React from "react";

import { getProfile } from "@/actions/profile";
import { getUser } from "@/actions/user";
import { DashboardHeader } from "@/components/dashboard-header";
import { DashboardSidebar } from "./dashboard-sidebar";
import { SendFeedback } from "./send-feedback";

export const DashboardLayout = async ({
  children,
}: React.PropsWithChildren) => {
  const [profile, user] = await Promise.all([getProfile(), getUser()]);

  return (
    <section className="py-6 md:px-6 px-4 max-w-[2000px] mx-auto">
      <DashboardHeader
        isAnonymous={user?.isAnonymous}
        profile={profile?.data!}
      />

      <div className="w-full flex gap-12 px-24 md:mt-12">
        <DashboardSidebar />
        <>{children}</>
      </div>

      <SendFeedback />
    </section>
  );
};
