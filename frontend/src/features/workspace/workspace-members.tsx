import { getWorkspaceMembers } from "@/actions/workpace";
import { Badge } from "@/components/ui/badge";
import { ClientWorkspaceMembers } from "./client-workspace-members";

interface Props {
  workspaceId: string;
}
export const WorkspaceMembers = async ({ workspaceId }: Props) => {
  const members = await getWorkspaceMembers(workspaceId);

  console.log({ members });

  if (!!members?.length) return <div>No members</div>;

  return (
    <div>
      <b>Workspace members</b>
      <ul className="flex items-center gap-2 mt-4">
        {members.map((member) => (
          <Badge key={member.username}>{member.username}</Badge>
        ))}
      </ul>

      <ClientWorkspaceMembers members={members} />
    </div>
  );
};
