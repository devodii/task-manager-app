"use client";

import { TaskProvider } from "@/contexts/task-context";
import { WorkspaceMembersProvider } from "@/contexts/workspace-members-context";
import { AssigneeProvider } from "@task/assignee-selector";
import * as React from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

export const WorkspaceProvider = ({ children }: React.PropsWithChildren) => {
  return (
    <DndProvider backend={HTML5Backend}>
      <WorkspaceMembersProvider>
        <TaskProvider>
          <AssigneeProvider>{children}</AssigneeProvider>
        </TaskProvider>
      </WorkspaceMembersProvider>
    </DndProvider>
  );
};
