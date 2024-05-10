"use client";

import { TaskProvider } from "@/hooks/use-task";
import { WorkspaceMembersProvider } from "@/hooks/use-workspace-member";
import { AssigneeProvider } from "@task/assignee-selector";
import * as React from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

export const AppProvider = ({ children }: React.PropsWithChildren) => {
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
