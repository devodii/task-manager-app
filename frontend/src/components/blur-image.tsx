"use client";

import { cn } from "@/lib/utils";
import Image, { type ImageProps } from "next/image";
import * as React from "react";

interface Props extends ImageProps {
  fallbackText?: string;
}

export const BlurImage = ({ fallbackText, src, className, ...rest }: Props) => {
  const [isLoading, setIsLoading] = React.useState(true);

  const [error, setError] = React.useState(false);

  if (error) {
    return (
      <div
        className={cn(
          "flex items-center justify-center rounded-full text-black bg-gray-400 uppercase",
          className
        )}
      >
        {fallbackText}
      </div>
    );
  }

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
      onError={() => setError(true)}
    />
  );
};
