"use client";

import { parseElementsContext } from "@/lib/context";
import { WorkspaceMember } from "@/types";
import * as React from "react";

type IWorkspacembersContext = {
  members: WorkspaceMember[];
  setMembers: React.Dispatch<React.SetStateAction<WorkspaceMember[]>>;
};

// @ts-ignore
const WorkspaceMembersContext = React.createContext<IWorkspacembersContext>();

const WorkspaceMembersProvider = ({ children }: React.PropsWithChildren) => {
  const [members, setMembers] = React.useState<WorkspaceMember[]>([]);

  return (
    <WorkspaceMembersContext.Provider value={{ members, setMembers }}>
      {children}
    </WorkspaceMembersContext.Provider>
  );
};

const useWorkspaceMembers = () => {
  const context = React.useContext(WorkspaceMembersContext);
  return parseElementsContext(context, "workspace-member");
};

export { useWorkspaceMembers, WorkspaceMembersProvider };
