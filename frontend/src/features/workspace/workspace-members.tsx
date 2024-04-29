import { getWorkspaceMembers } from "@/actions/workpace";
import { Badge } from "@/components/ui/badge";

interface Props {
  workspaceId: string;
}
export const WorkspaceMembers = async ({ workspaceId }: Props) => {
  const members = await getWorkspaceMembers(workspaceId);

  return (
    <div>
      <b>Workspace members</b>
      <ul className="flex items-center gap-2 mt-4">
        {members.map((member) => (
          <Badge key={member.username}>{member.username}</Badge>
        ))}
      </ul>
    </div>
  );
};
