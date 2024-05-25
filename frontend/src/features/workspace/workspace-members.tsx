import { getWorkspaceMembers } from "@/actions/workpace";
import { ClientWorkspaceMembers } from "./client-workspace-members";

interface Props {
  workspaceId: string;
}
export const WorkspaceMembers = async ({ workspaceId }: Props) => {
  const members = await getWorkspaceMembers(workspaceId);

  return <ClientWorkspaceMembers members={members} />;
};
