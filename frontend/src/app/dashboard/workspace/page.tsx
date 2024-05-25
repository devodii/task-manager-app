import * as React from "react";

import { getProfile } from "@/actions/profile";
import { getWorkspace } from "@/actions/workpace";
import { TooltipWithChildren } from "@/components/tooltip-wrapper";
import { Button } from "@/components/ui/button";
import { GettingStarted } from "@dashboard/getting-started";
import { CreateTask } from "@task/create-task";
import { TaskBoard } from "@task/task-board";
import { ClientWorkspaceTags } from "@workspace/client-workspace.tags";
import { SendWorkspaceInvitation } from "@workspace/send-workspace-invitation";
import { WorkspaceMembers } from "@workspace/workspace-members";
import { nanoid } from "nanoid";

import { CreateWorkspace as EditWorkspace } from "@workspace/create-workspace";
import { RiEdit2Line } from "react-icons/ri";

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

  if (!workspace?.id) return <GettingStarted />;

  return (
    <section className="container">
      <div className="flex items-center justify-between my-4">
        <div className="text-2xl font-medium">{workspace.name}</div>

        <div className="flex items-center gap-4">
          <TooltipWithChildren hint="edit workspace">
            <EditWorkspace action="update" metadata={workspace}>
              <RiEdit2Line size={20} className="cursor-pointer text-gray-700" />
            </EditWorkspace>
          </TooltipWithChildren>

          <TooltipWithChildren hint="members">
            <React.Suspense fallback={<div>Loading workspace members...</div>}>
              <WorkspaceMembers workspaceId={workspace?.id!} />
            </React.Suspense>
          </TooltipWithChildren>

          <SendWorkspaceInvitation invitationLink={workspaceUrl}>
            <Button
              variant="link"
              className="underline underline-offser-2 px-0"
            >
              Invite people
            </Button>
          </SendWorkspaceInvitation>

          <CreateTask workspaceId={workspace.id}>
            <Button className="bg-blue-500 hover:bg-blue-500/90 h-9 px-2.5">
              New
            </Button>
          </CreateTask>
        </div>
      </div>

      <React.Suspense fallback={<div>Loading task board..</div>}>
        <TaskBoard key={`task_board_${nanoid()}`} workspaceId={workspace?.id} />
      </React.Suspense>

      {searchParams?.task?.length > 1 && (
        <CreateTask
          defaultOpen={true}
          defaultTitle={searchParams.task}
          workspaceId={workspace.id}
        />
      )}

      <ClientWorkspaceTags tags={workspace.metadata?.tags} />
    </section>
  );
}
