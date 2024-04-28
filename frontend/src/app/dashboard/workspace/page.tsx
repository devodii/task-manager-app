import { getWorkspace } from "@/actions/workpace";
import { Button } from "@/components/ui/button";
import { SendWorkspaceInvitation } from "@workspace/send-workspace-invitation";

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

      <div>{JSON.stringify(workspace)}</div>
    </div>
  );
}
