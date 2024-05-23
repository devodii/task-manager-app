import { parseElementsContext } from "@/lib/context";
import { Tag } from "@/types";
import * as React from "react";

// @ts-ignore --- todo: add type
const WorkspaceTagsContext = React.createContext<any>();

export const WorkspaceTagsProvider = ({
  children,
}: React.PropsWithChildren) => {
  const [tags, setTags] = React.useState<Tag[]>([]);

  const [currentlySelectedTag, setCurrentlySelectedTag] = React.useState<
    Tag | {}
  >({});

  return (
    <WorkspaceTagsContext.Provider
      value={{ tags, setTags, currentlySelectedTag, setCurrentlySelectedTag }}
    >
      {children}
    </WorkspaceTagsContext.Provider>
  );
};

export const useWorkspaceTags = () => {
  const ctx = React.useContext(WorkspaceTagsContext);
  return parseElementsContext(ctx, "workspace tags");
};
