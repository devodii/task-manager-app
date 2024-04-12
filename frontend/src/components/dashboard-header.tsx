import { getUser } from "@/actions/user";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { ProfileDialog } from "./profile-dialog";

export const DashboardHeader = async () => {
  const user = await getUser();

  const userInitial = user?.email?.slice(0, 2);

  return (
    <header className="border-b pb-4 w-full">
      <div className="container flex items-center justify-between">
        <div className="text-2xl">Task Manager</div>

        <ProfileDialog>
          <Avatar>
            <AvatarFallback className="uppercase font-semibold select-none cursor-pointer">
              {userInitial}
            </AvatarFallback>
          </Avatar>
        </ProfileDialog>
      </div>
    </header>
  );
};
