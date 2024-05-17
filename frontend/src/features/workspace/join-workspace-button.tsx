"use client";

import { joinWorkspace } from "@/actions/workpace";
import { Button, ButtonProps } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import * as React from "react";

interface Props extends ButtonProps {
  workspaceId: string;
}

export const JoinWorkspaceButton = ({ workspaceId, ...rest }: Props) => {
  const [isJoining, setisJoining] = React.useState(false);

  return (
    <Button
      onClick={() => {
        setisJoining(true);
        joinWorkspace(workspaceId);
      }}
      {...rest}
      disabled={isJoining}
      className={cn(isJoining ? "cursor-not-allowed" : "cursor-pointer")}
    >
      Join now
    </Button>
  );
};
