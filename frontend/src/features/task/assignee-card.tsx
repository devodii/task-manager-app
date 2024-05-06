"use client";

import { cn, getInitials } from "@/lib/utils";
import Image from "next/image";
import * as React from "react";

interface Props {
  name: string;
  url: string;
  variant: "sm" | "md";
  imgOnly?: boolean;
}

export const AssigneeCard = ({
  name,
  url,
  variant = "sm",
  imgOnly = false,
}: Props) => {
  const [error, setError] = React.useState(false);

  if (name?.length < 1) return;

  if (url?.length < 3 || error)
    return (
      <div className="flex items-center gap-1">
        <div className="size-6 bg-gray-300 text-black rounded-full text-center font-medium text-[14px] uppercase flex items-center justify-center">
          {getInitials(name!)}
        </div>
        {!imgOnly && (
          <span
            className={cn(
              "font-medium",
              variant == "sm" ? "text-[11px]" : "text-[14px]"
            )}
          >
            {name}
          </span>
        )}
      </div>
    );

  return (
    <div className="flex items-center gap-1">
      <Image
        alt={`${name} on Task Manager App`}
        src={url!}
        quality={100}
        height={variant === "sm" ? 20 : 35}
        width={variant === "sm" ? 20 : 35}
        className={cn(
          "rounded-full object-cover",
          variant == "sm" ? "size-4" : "size-6"
        )}
        onError={() => setError(true)}
      />
      {!imgOnly && (
        <span
          className={cn(
            "font-medium",
            variant == "sm" ? "text-[11px]" : "text-[14px]"
          )}
        >
          {name}
        </span>
      )}
    </div>
  );
};

AssigneeCard.displayName = "AssigneeCard";
