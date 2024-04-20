"use client";

import { cn } from "@/lib/utils";
import Image, { type ImageProps } from "next/image";
import * as React from "react";

export const BlurImage = ({ src, className, ...rest }: ImageProps) => {
  const [isLoading, setIsLoading] = React.useState(true);
  return (
    // eslint-disable-next-line jsx-a11y/alt-text
    <Image
      {...rest}
      src={src}
      key={src as string}
      onLoad={() => setIsLoading(false)}
      className={cn(
        "duration-700 ease-in-out",
        isLoading ? "scale-100 blur-sm" : "scale-100 blur-0",
        className
      )}
    />
  );
};
