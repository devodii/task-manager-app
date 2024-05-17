import * as React from "react";

import { getProfile } from "@/actions/profile";
import { getWorkspace } from "@/actions/workpace";
import { Button } from "@/components/ui/button";
import { GettingStarted } from "@dashboard/getting-started";
import { CreateTask } from "@task/create-task";
import { TaskBoard } from "@task/task-board";
import { EditWorkspace } from "@workspace/edit-workspace";
import { SendWorkspaceInvitation } from "@workspace/send-workspace-invitation";
import { WorkspaceMembers } from "@workspace/workspace-members";
import { nanoid } from "nanoid";

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
    return <GettingStarted username={profile.data.username} />;

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
        <TaskBoard key={`task_board_${nanoid()}`} workspaceId={workspace?.id} />
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
