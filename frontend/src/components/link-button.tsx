"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface Props {
  path: string;
  label: string;
}

export const LinkButton = ({ label, path }: Props) => {
  const pathname = usePathname();

  const isActive = (href: string) => href === pathname;

  return (
    <Button asChild variant={"ghost"}>
      <Link
        href={path}
        className={cn(
          "py-2 px-6 text-black rounded-md max-w-full w-full",
          isActive(path) ? "bg-gray-200" : ""
        )}
      >
        <span className="text-md text-start">{label}</span>
      </Link>
    </Button>
  );
};
