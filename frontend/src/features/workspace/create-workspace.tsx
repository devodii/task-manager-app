"use client";

import * as React from "react";

import { createWorkspace, updateWorkspace } from "@/actions/workpace";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Workspace } from "@/types";
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
import { toast } from "sonner";

interface Props {
  children?: React.ReactNode;

  action?: "create" | "update";
  metadata?: Workspace;
}

export const CreateWorkspace = ({
  children: trigger,
  action = "create",
  metadata,
}: Props) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
    callback: any
  ) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const formdata = new FormData(e.currentTarget);

      const name = formdata.get("name") as string;
      const response =
        action == "create"
          ? await createWorkspace(formdata)
          : await updateWorkspace(metadata!.id, name);

      console.log({ response });

      if (response == undefined) return;

      if (!response?.success) {
        toast("An error occured while creating your workspace");
      }
    } catch (error) {
      // do nothing..
    } finally {
      callback?.();
      setIsLoading(false);
    }
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
          <DialogTitle>
            {action == "create" ? "Create a workspace" : "Edit your workspace"}
          </DialogTitle>

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
              placeholder="Future Unicorn Inc. 🦄"
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
            <span>
              {action === "create" ? "create workspace" : "edit workspace"}
            </span>
            {isLoading && <CgSpinnerAlt className="animate-spin" size={20} />}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
