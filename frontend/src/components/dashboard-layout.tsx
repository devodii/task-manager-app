"use client";

import * as React from "react";

import { DashboardHeader } from "@/components/dashboard-header";
import { DashboardSidebar } from "@/components/dashboard-sidebar";
import { SendFeedback } from "@/components/send-feedback";
import { Profile, User } from "@/types";

interface Props {
  user: User;
  profile: Profile;
  children: React.ReactNode;
}

export const DashboardLayout = ({ children, profile, user }: Props) => {
  return (
    <section className="py-6 md:px-6 px-4 max-w-[2000px] mx-auto">
      <DashboardHeader isAnonymous={user?.isAnonymous} profile={profile} />

      <div className="w-full flex gap-12 px-24 md:mt-12">
        <DashboardSidebar user={user} />
        <>{children}</>
      </div>

      <SendFeedback />
    </section>
  );
};
