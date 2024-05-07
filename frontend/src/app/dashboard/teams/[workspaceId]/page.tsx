import { getProfile } from "@/actions/profile";
import { findWorkspace, getWorkspaceMembers } from "@/actions/workpace";
import { TaskBoard } from "@task/task-board";
import { NotWorkspaceMember } from "@workspace/not-workspace-member";
import { nanoid } from "nanoid";
import { notFound } from "next/navigation";
import * as React from "react";

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

  return (
    <section className="flex flex-col gap-4 w-full">
      <div className="text-2xl font-medium">{workspace.name}</div>

      <React.Suspense fallback={<div>Loading task board..</div>}>
        <TaskBoard
          isOwner={false}
          workspaceId={params.workspaceId}
          key={`task_board_${nanoid()}`}
        />
      </React.Suspense>
    </section>
  );
}
