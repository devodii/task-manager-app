"use client";

import * as React from "react";

import { deleteFakeUser, signOut } from "@/actions/user";
import { SubmitButton } from "@/components/submit-button";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@ui/popover";
import Link from "next/link";

interface Props {
  isAnonymous: boolean;
  children: React.ReactNode;
}

export const ProfileDialog = ({ children: trigger, isAnonymous }: Props) => {
  return (
    <Popover>
      <PopoverTrigger asChild>{trigger}</PopoverTrigger>
      <PopoverContent className="flex flex-col gap-2">
        <Button variant="outline" asChild>
          <Link href={"/dashboard/profile"}>Profile</Link>
        </Button>

        <form
          action={() => (isAnonymous ? deleteFakeUser() : signOut())}
          className="w-full"
        >
          <SubmitButton variant="outline" className="text-black">
            Logout
          </SubmitButton>
        </form>
      </PopoverContent>
    </Popover>
  );
};
