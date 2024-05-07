"use client";

import * as React from "react";
import { useWorkspaceMembers } from "@/contexts/workspace-members-context";
import { WorkspaceMember } from "@/types";

interface Props {
  members: WorkspaceMember[];
}

export const ClientWorkspaceMembers = ({ members }: Props) => {
  const { setMembers } = useWorkspaceMembers();

  React.useEffect(() => {
    setMembers(members);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [members]);

  return null;
};
