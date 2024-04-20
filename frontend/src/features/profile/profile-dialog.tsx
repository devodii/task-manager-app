"use client";

import * as React from "react";

import { signOut } from "@/actions/user";
import { Popover, PopoverContent, PopoverTrigger } from "@ui/popover";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SubmitButton } from "@/components/submit-button";

export const ProfileDialog = ({
  children: trigger,
}: React.PropsWithChildren) => {
  return (
    <Popover>
      <PopoverTrigger asChild>{trigger}</PopoverTrigger>
      <PopoverContent className="flex flex-col gap-2">
        <Button variant="outline" asChild>
          <Link href={"/dashboard/profile"}>Profile</Link>
        </Button>

        <form action={signOut} className="w-full">
          <SubmitButton variant="outline" className="text-black">
            Logout
          </SubmitButton>
        </form>
      </PopoverContent>
    </Popover>
  );
};
