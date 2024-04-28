"use client";

import { joinWorkspace } from "@/actions/workpace";
import { Button, ButtonProps } from "@/components/ui/button";

interface Props extends ButtonProps {
  workspaceId: string;
}

export const JoinWorkspaceButton = ({ workspaceId, ...rest }: Props) => (
  <Button onClick={() => joinWorkspace(workspaceId)} {...rest}>
    Join now
  </Button>
);
