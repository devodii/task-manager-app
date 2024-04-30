import { getWorkspace } from "@/actions/workpace";
import { Button } from "@/components/ui/button";
import { Tasks } from "@task/tasks";
import { CreateTask } from "@task/create-task";
import { SendWorkspaceInvitation } from "@workspace/send-workspace-invitation";
import { WorkspaceMembers } from "@workspace/workspace-members";
import * as React from "react";

export default async function WorkspacePage() {
  const workspace = await getWorkspace();

  const workspaceUrl = process.env.APP_URL + `/join/${workspace?.id}`;

  return (
    <div className="container">
      <div className="w-full flex items-end justify-end">
        <SendWorkspaceInvitation invitationLink={workspaceUrl}>
          <Button variant="link" className="underline underline-offser-2">
            Invite people
          </Button>
        </SendWorkspaceInvitation>
      </div>

      <React.Suspense fallback={<div>Loading workspace members...</div>}>
        <WorkspaceMembers workspaceId={workspace?.id!} />
      </React.Suspense>

      <React.Suspense fallback={<div>Loading tasks..</div>}>
        <Tasks />
      </React.Suspense>

      <CreateTask>create</CreateTask>
    </div>
  );
}
