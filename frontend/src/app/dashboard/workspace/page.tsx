import { getProfile } from "@/actions/profile";
import { getWorkspace } from "@/actions/workpace";
import { Button } from "@/components/ui/button";
import { EditWorkspace } from "@/features/workspace/edit-workspace";
import { CreateTask } from "@task/create-task";
import { TaskBoard } from "@task/task-board";
import { CreateWorkspace } from "@workspace/create-workspace";
import { SendWorkspaceInvitation } from "@workspace/send-workspace-invitation";
import { WorkspaceMembers } from "@workspace/workspace-members";
import { nanoid } from "nanoid";
import * as React from "react";

interface Props {
  searchParams: {
    task: string;
  };
}

export default async function WorkspacePage({ searchParams }: Props) {
  const [profile, workspace] = await Promise.all([
    getProfile(),
    getWorkspace(),
  ]);

  const workspaceUrl = process.env.APP_URL + `/join/${workspace?.id}`;

  if (!profile?.data?.id) {
    return <div>Please create a profile in order to create workspace</div>;
  }

  if (!workspace?.id)
    return (
      <div className="w-full items-center flex justify-center flex-col gap-4">
        <h4>Create a workspace to start getting organized with your team</h4>
        <CreateWorkspace username={profile?.data?.username!}>
          <Button>create workspace</Button>
        </CreateWorkspace>
      </div>
    );

  return (
    <section className="container">
      <div className="flex items-center justify-between my-4">
        <div className="text-2xl font-medium">{workspace.name}</div>

        <div className="flex items-center gap-1">
          <EditWorkspace workspace={workspace} />
          <SendWorkspaceInvitation invitationLink={workspaceUrl}>
            <Button variant="link" className="underline underline-offser-2">
              Invite people
            </Button>
          </SendWorkspaceInvitation>
        </div>
      </div>

      <React.Suspense fallback={<div>Loading task board..</div>}>
        <TaskBoard isOwner key={`task_board_${nanoid()}`} />
      </React.Suspense>

      <CreateTask workspaceId={workspace.id}>
        <Button variant="default" className="mt-8 mx-auto w-full max-w-xs">
          create task
        </Button>
      </CreateTask>

      <React.Suspense fallback={<div>Loading workspace members...</div>}>
        <WorkspaceMembers workspaceId={workspace?.id!} />
      </React.Suspense>

      {searchParams?.task?.length > 1 && (
        <CreateTask
          defaultOpen={true}
          defaultTitle={searchParams.task}
          workspaceId={workspace.id}
        />
      )}
    </section>
  );
}
