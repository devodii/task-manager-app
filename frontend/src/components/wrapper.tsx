import { cn } from "@/lib/utils";
import * as React from "react";

interface Props extends React.HTMLAttributes<any> {
  as?: keyof JSX.IntrinsicElements;
}

export const Wrapper = ({ className, as: Tag = "div", ...rest }: Props) => (
  <Tag
    className={cn(
      `min-h-screen w-screen flex items-center justify-center bg-white ${className}`
    )}
    {...rest}
  />
);
