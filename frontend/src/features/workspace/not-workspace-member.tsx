import { JoinWorkspaceButton } from "@workspace/join-workspace-button";

interface Props {
  workspaceId: string;
}

export const NotWorkspaceMember = ({ workspaceId }: Props) => {
  return (
    <section className="mt-6 w-full flex flex-col items-center justify-center gap-2">
      <h2 className="font-semibold text-2xl">
        You are not a member of this team.
      </h2>
      <span>But.. you can join them now.</span>
      <JoinWorkspaceButton
        workspaceId={workspaceId}
        className="w-full max-w-xs"
      />
    </section>
  );
};
