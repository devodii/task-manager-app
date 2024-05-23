"use client";

import { TaskProvider } from "@/hooks/use-task";
import { WorkspaceMembersProvider } from "@/hooks/use-workspace-member";
import { WorkspaceTagsProvider } from "@/hooks/use-workspace-tags";
import { AssigneeProvider } from "@task/assignee-selector";
import * as React from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

export const AppProvider = ({ children }: React.PropsWithChildren) => {
  return (
    <DndProvider backend={HTML5Backend}>
      <WorkspaceMembersProvider>
        <TaskProvider>
          <AssigneeProvider>
            <WorkspaceTagsProvider>{children}</WorkspaceTagsProvider>
          </AssigneeProvider>
        </TaskProvider>
      </WorkspaceMembersProvider>
    </DndProvider>
  );
};
