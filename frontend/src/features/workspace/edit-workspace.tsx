"use client";

import { Workspace } from "@/types";
import { CreateWorkspace } from "./create-workspace";
import { RiEdit2Line } from "react-icons/ri";
import {
  Tooltip,
  TooltipProvider,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";

interface Props {
  workspace: Workspace;
}

export const EditWorkspace = ({ workspace }: Props) => {
  return (
    <TooltipProvider delayDuration={200}>
      <Tooltip>
        <TooltipTrigger>
          <CreateWorkspace action="update" metadata={workspace}>
            <RiEdit2Line size={20} className="cursor-pointer" />
          </CreateWorkspace>
        </TooltipTrigger>

        <TooltipContent>
          <p>edit workspace</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
