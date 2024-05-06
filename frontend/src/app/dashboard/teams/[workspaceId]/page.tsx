import { getProfile } from "@/actions/profile";
import { findWorkspace, getWorkspaceMembers } from "@/actions/workpace";
import { JoinWorkspaceButton } from "@workspace/join-workspace-button";
import { notFound } from "next/navigation";

interface Props {
  params: {
    workspaceId: string;
  };
}

export default async function TeamWorkspacePage({ params }: Props) {
  const profile = await getProfile();
  const workspace = await findWorkspace(params.workspaceId);

  if (!workspace.id) return notFound();

  const members = await getWorkspaceMembers(params.workspaceId);

  const isMember = members.some(
    (member) => member.username == profile?.data?.username
  );

  if (!isMember) {
    return (
      <section className="mt-6 w-full flex flex-col items-center justify-center gap-2">
        <h2 className="font-semibold text-2xl">
          You are not a member of this team.
        </h2>
        <span>But.. you can join them now.</span>
        <JoinWorkspaceButton
          workspaceId={params.workspaceId}
          className="w-full max-w-xs"
        />
      </section>
    );
  }

  return <section>Team workspace page</section>;
}
