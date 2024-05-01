"use client";

import * as React from "react";

import { createWorkspace } from "@/actions/workpace";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@ui/dialog";
import { Input } from "@ui/input";
import { Label } from "@ui/label";
import { CgSpinnerAlt } from "react-icons/cg";

interface Props {
  children?: React.ReactNode;
  username: string;
}

export const CreateWorkspace = ({ children: trigger, username }: Props) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
    callback: any
  ) => {
    e.preventDefault();
    setIsLoading(true);

    // todo: handle errors
    const formdata = new FormData(e.currentTarget);
    await createWorkspace(formdata);

    callback?.();
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(val) => {
        setIsOpen(val);
      }}
    >
      {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}
      <DialogContent className="w-full max-w-3xl">
        <DialogHeader>
          <DialogTitle>Create a workspace</DialogTitle>

          <DialogDescription>
            A workspace is a place where you can solve problems with your
            teammates
          </DialogDescription>
        </DialogHeader>

        <form
          className="space-y-4"
          onSubmit={(e: any) =>
            handleSubmit(e, () => {
              setIsOpen(false);
            })
          }
        >
          <div className="space-y-1">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              name="name"
              placeholder={
                username ? `${username}'s workspace` : "My workspace"
              }
              required
            />
          </div>

          <Button
            className={cn(
              `text-white w-full justify-center gap-4 items-center font-semibold  max-w-full ${
                isLoading ? "cursor-not-allowed" : ""
              }`
            )}
            aria-disabled={isLoading}
            type="submit"
          >
            <span>create workspace</span>
            {isLoading && <CgSpinnerAlt className="animate-spin" size={20} />}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
