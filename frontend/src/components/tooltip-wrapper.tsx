"use client";

import * as React from "react";
import {
  TooltipProvider,
  TooltipTrigger,
  TooltipContent,
  Tooltip,
} from "@ui/tooltip";

interface Props {
  children: React.ReactNode;
  hint: string;
}

export const TooltipWithChildren = ({ children, hint }: Props) => {
  return (
    <TooltipProvider delayDuration={200}>
      <Tooltip>
        <TooltipTrigger>{children}</TooltipTrigger>

        <TooltipContent>
          <p className="text-[12px]">{hint}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
