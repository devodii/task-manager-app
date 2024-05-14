import { getProfile } from "@/actions/profile";
import { getUser } from "@/actions/user";
import { ProfileDialog } from "@profile/profile-dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@ui/avatar";
import Link from "next/link";

export const DashboardHeader = async () => {
  const [profile, user] = await Promise.all([getProfile(), getUser()]);
  const userInitial = profile?.data?.id
    ? profile.data?.username.split(" ")[0][0]
    : user?.email?.slice(0, 1);

  return (
    <header className="border-b pb-4 w-full">
      <div className="container flex items-center justify-between">
        <Link href="/dashboard" className="text-2xl">
          Task Manager
        </Link>

        <div className="flex items-center gap-4">
          <ProfileDialog isAnonymous={user?.isAnonymous}>
            <Avatar>
              <AvatarImage
                src={profile?.data?.imageUrl}
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
