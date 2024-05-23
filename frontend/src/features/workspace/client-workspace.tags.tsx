"use client";

import * as React from "react";

import { useWorkspaceTags } from "@/hooks/use-workspace-tags";
import { Tag } from "@/types";

interface Props {
  tags: Tag[];
}

export const ClientWorkspaceTags = ({ tags }: Props) => {
  const { setTags } = useWorkspaceTags();

  React.useEffect(() => {
    setTags(tags);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tags]);

  return null;
};
