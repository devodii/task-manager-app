"use client";

import * as React from "react";

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
import { Textarea } from "@ui/textarea";
import { SubmitButton } from "./submit-button";
import { createTask, updateTask } from "@/actions/task";
import { Task } from "@/types";

interface Props {
  children: React.ReactNode;
  action?: "create" | "edit";
  metadata?: Task;
}

export const CreateTask = ({
  children: trigger,
  action = "create",
  metadata,
}: Props) => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      {trigger && <DialogTrigger>{trigger}</DialogTrigger>}
      <DialogContent className="w-full max-w-3xl">
        <DialogHeader>
          <DialogTitle>
            {action === "create" ? "Create a task" : "Edit this task"}
          </DialogTitle>
          {action == "create" && (
            <DialogDescription>Start becoming producive now!</DialogDescription>
          )}
        </DialogHeader>

        <form
          className="space-y-4"
          action={
            action == "create"
              ? async (formdata) => {
                  createTask(formdata);
                  setIsOpen(false);
                }
              : async (formdata) => {
                  updateTask(formdata, metadata?.id as number);
                  setIsOpen(false);
                }
          }
        >
          <div className="space-y-1">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              name="title"
              placeholder="Add a paywall.."
              required
              defaultValue={metadata?.title}
            />
          </div>

          <div className="space-y-1">
            <Label htmlFor="description">Title</Label>
            <Textarea
              id="description"
              name="description"
              placeholder="Create stripe webhook endpoint..."
              required
              defaultValue={metadata?.description}
            />
          </div>

          <SubmitButton className="w-full max-w-full">
            {action == "create" ? "create" : "edit"}
          </SubmitButton>
        </form>
      </DialogContent>
    </Dialog>
  );
};
