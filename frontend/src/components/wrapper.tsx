import { cn } from "@/lib/utils";
import * as React from "react";

interface Props extends React.HTMLAttributes<HTMLDivElement> {}

export const Wrapper = ({ className, ...rest }: Props) => (
  <div
    className={cn(
      `min-h-screen w-screen flex items-center justify-center bg-white ${className}`
    )}
    {...rest}
  />
);
