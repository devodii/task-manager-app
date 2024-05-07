import { getUser } from "@/actions/user";
import { findWorkspace } from "@/actions/workpace";
import { Button } from "@/components/ui/button";
import { Wrapper } from "@/components/wrapper";
import { JoinWorkspaceButton } from "@workspace/join-workspace-button";
import Link from "next/link";
import { notFound } from "next/navigation";

interface Props {
  params: {
    workspaceId: string;
  };
}

export default async function JoinWorkspacePage({
  params: { workspaceId },
}: Props) {
  const workspace = await findWorkspace(workspaceId);
  const user = await getUser();

  if (!workspace?.id) return notFound();

  return (
    <Wrapper className="px-6 md:px-12">
      <div className="rounded-md w-full max-w-xl flex flex-col gap-4 mx-auto">
        <b className="capitalize text-xl text-center">Join {workspace?.name}</b>
        <p className="text-center">
          You have been invited to join {workspace?.name}
        </p>

        {user?.id ? (
          <JoinWorkspaceButton workspaceId={workspace?.id} />
        ) : (
          <Button asChild>
            <Link href={`/sign-in?next=/join/${workspaceId}`}>Login</Link>
          </Button>
        )}
      </div>
    </Wrapper>
  );
}
