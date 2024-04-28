import { getWorkspace, getWorkspaceMembers } from "@/actions/workpace";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SendWorkspaceInvitation } from "@workspace/send-workspace-invitation";

export default async function WorkspacePage() {
  const workspace = await getWorkspace();
  const members = await getWorkspaceMembers(workspace?.id!);

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

      <b>Workspace members</b>
      <ul className="flex items-center gap-2 mt-4">
        {members.map((member) => (
          <Badge key={member.username}>{member.username}</Badge>
        ))}
      </ul>
      <div></div>
    </div>
  );
}
