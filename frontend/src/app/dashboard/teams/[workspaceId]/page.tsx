import * as React from "react";

import { getProfile } from "@/actions/profile";
import { findWorkspace, getWorkspaceMembers } from "@/actions/workpace";
import { Button } from "@/components/ui/button";
import { SendWorkspaceInvitation } from "@/features/workspace/send-workspace-invitation";
import { CreateTask } from "@task/create-task";
import { TaskBoard } from "@task/task-board";
import { NotWorkspaceMember } from "@workspace/not-workspace-member";
import { WorkspaceMembers } from "@workspace/workspace-members";
import { nanoid } from "nanoid";
import { notFound } from "next/navigation";

interface Props {
  params: {
    workspaceId: string;
  };
}

export default async function TeamWorkspacePage({ params }: Props) {
  const [profile, workspace] = await Promise.all([
    getProfile(),
    findWorkspace(params.workspaceId),
  ]);

  if (!workspace.id) return notFound();

  const members = await getWorkspaceMembers(params.workspaceId);

  const isMember = members.some(
    (member) => member.username == profile?.data?.username
  );

  if (!isMember) return <NotWorkspaceMember workspaceId={params.workspaceId} />;

  const workspaceUrl = process.env.APP_URL + `/join/${workspace?.id}`;

  return (
    <section className="flex flex-col gap-4 w-full">
      <div className="flex items-center justify-between my-4">
        <div className="text-2xl font-medium">{workspace.name}</div>
        <SendWorkspaceInvitation invitationLink={workspaceUrl}>
          <Button variant="link" className="underline underline-offser-2">
            Invite people
          </Button>
        </SendWorkspaceInvitation>
      </div>

      <React.Suspense fallback={<div>Loading task board..</div>}>
        <TaskBoard
          workspaceId={params.workspaceId}
          key={`task_board_${nanoid()}`}
        />
      </React.Suspense>

      <CreateTask workspaceId={workspace.id}>
        <Button variant="default" className="mt-8 w-full max-w-xs">
          create task
        </Button>
      </CreateTask>

      <React.Suspense fallback={<div>Loading workspace members...</div>}>
        <WorkspaceMembers workspaceId={workspace?.id!} />
      </React.Suspense>
    </section>
  );
}
