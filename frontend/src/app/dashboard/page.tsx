import { getProfile } from "@/actions/profile";
import { getTasks } from "@/actions/task";
import { getWorkspace } from "@/actions/workpace";
import { DashboardHeader } from "@/components/dashboard-header";
import { SendFeedback } from "@/components/send-feedback";
import { Button } from "@/components/ui/button";
import { CreateTask } from "@task/create-task";
import { CreateWorkspace } from "@workspace/create-workspace";

interface Props {
  searchParams: {
    task: string;
  };
}

export default async function DashboardPage({ searchParams }: Props) {
  const [profile, workspace, tasks] = await Promise.all([
    getProfile(),
    getWorkspace(),
    getTasks(),
  ]);

  return (
    <section className="py-6 md:px-6">
      <DashboardHeader />

      {tasks.length < 1 && !workspace?.id && (
        <div className="flex flex-col gap-6">
          <h4 className="text-2xl md:text-3xl font-semibold text-center mt-8 md:mt-14">
            You’re almost set to start being productive
          </h4>
          <p className="text-center">Choose how you want to get started</p>

          <div className="container grid grid-cols-1 md:grid-cols-2 md:divide-x w-full min-h-[50px] px-6 gap-12 mx-auto mt-12">
            <div className="flex flex-col gap-2 items-center justify-center mx-4 ">
              <p>Create a workspace</p>
              <span className="text-center">
                A workspace is a place where you get to work on tasks with your
                friends.
              </span>

              <div className="w-full flex items-center justify-center mt-4">
                <CreateWorkspace username={profile?.data?.username!}>
                  <Button>create workspace</Button>
                </CreateWorkspace>
              </div>
            </div>
            <div className="ml-5 flex flex-col gap-2 items-center justify-center">
              <p>Create a task</p>
              <span className="text-center">
                Here, you’ll only be able to create tasks for yourself.
              </span>
              <div className="w-full flex items-center justify-center mt-4">
                <CreateTask>
                  <Button>create task</Button>
                </CreateTask>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* <div className="container flex flex-col gap-8 h-full mt-12 md:mt-20 w-screen items-center justify-center mx-auto">
        <div className="text-2xl font-semibold">Tasks</div>

        <React.Suspense fallback={<div>Loading tasks..</div>}>
          <Tasks />
        </React.Suspense>
      </div> */}

      {searchParams?.task?.length > 1 && <CreateTask defaultOpen={true} />}

      <SendFeedback />
    </section>
  );
}
