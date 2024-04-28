"use client";

import * as React from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@ui/dialog";

import { IoCopyOutline } from "react-icons/io5";
import { toast } from "sonner";

interface Props {
  children: React.ReactNode;
  invitationLink: string;
}

export const SendWorkspaceInvitation = ({
  children: trigger,
  invitationLink,
}: Props) => {
  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(invitationLink);
      toast("link copied to clipboard");
    } catch (err) {
      toast("failed to copy!");
    }
  };
  return (
    <Dialog>
      {trigger && <DialogTrigger>{trigger}</DialogTrigger>}
      <DialogContent
        className="w-full max-w-3xl h-max"
        onInteractOutside={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle>Invite people to your workspace</DialogTitle>
        </DialogHeader>

        <div className="space-y-2">
          <p>Share this link with others youll like to join your workspace</p>

          <div className="flex items-center space-x-2 mt-12">
            <div className="grid flex-1 gap-2">
              <Label htmlFor="link" className="sr-only">
                Link
              </Label>
              <Input id="link" defaultValue={invitationLink} readOnly />
            </div>

            <Button type="submit" size="sm" className="px-3" onClick={onCopy}>
              <span className="sr-only">Copy</span>
              <IoCopyOutline className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
