"use client";

import { Profile } from "@/types";
import { ProfileDialog } from "@profile/profile-dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@ui/avatar";
import Link from "next/link";

interface Props {
  isAnonymous: boolean;
  profile: Profile;
}

export const DashboardHeader = ({ isAnonymous, profile }: Props) => {
  /**
   * "U" as an initial represents the word "user"
   */
  const userInitial = profile?.username.split(" ")[0][0] ?? "U";

  return (
    <header className="border-b pb-4 w-full">
      <div className="container flex items-center justify-between">
        <Link href="/dashboard" className="text-2xl">
          Task Manager
        </Link>

        <div className="flex items-center gap-4">
          <ProfileDialog isAnonymous={isAnonymous}>
            <Avatar>
              <AvatarImage
                src={profile?.imageUrl}
                className="object-cover cursor-pointer"
              />
              <AvatarFallback className="uppercase font-semibold select-none cursor-pointer">
                {userInitial}
              </AvatarFallback>
            </Avatar>
          </ProfileDialog>
        </div>
      </div>
    </header>
  );
};
