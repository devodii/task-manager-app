import { WorkspaceProvider } from "@providers/workspace-provider";
import * as React from "react";

interface Props {
  children: React.ReactNode;
}

export default async function WorkspaceLayout({ children }: Readonly<Props>) {
  return <WorkspaceProvider>{children}</WorkspaceProvider>;
}
