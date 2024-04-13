import { getUser } from "@/actions/user";
import { Button } from "@ui/button";
import { CreateTask } from "./create-task";
import { ProfileDialog } from "./profile-dialog";
import { Avatar, AvatarFallback } from "./ui/avatar";

export const DashboardHeader = async () => {
  const user = await getUser();

  const userInitial = user?.email?.slice(0, 2);

  return (
    <header className="border-b pb-4 w-full">
      <div className="container flex items-center justify-between">
        <div className="text-2xl">Task Manager</div>

        <div className="flex items-center gap-4">
          <ProfileDialog>
            <Avatar>
              <AvatarFallback className="uppercase font-semibold select-none cursor-pointer">
                {userInitial}
              </AvatarFallback>
            </Avatar>
          </ProfileDialog>
          <CreateTask>
            <Button>create task</Button>
          </CreateTask>
        </div>
      </div>
    </header>
  );
};
