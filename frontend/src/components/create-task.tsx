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
import { createTask } from "@/actions/task";

interface Props {
  children: React.ReactNode;
}

export const CreateTask = ({ children: trigger }: Props) => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      {trigger && <DialogTrigger>{trigger}</DialogTrigger>}
      <DialogContent className="w-full max-w-3xl">
        <DialogHeader>
          <DialogTitle>Create a task</DialogTitle>
          <DialogDescription>Start becoming producive now!</DialogDescription>
        </DialogHeader>

        <form
          className="space-y-4"
          action={async (formdata) => {
            createTask(formdata);
            setIsOpen(false);
          }}
        >
          <div className="space-y-1">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              name="title"
              placeholder="Add a paywall.."
              required
            />
          </div>

          <div className="space-y-1">
            <Label htmlFor="description">Title</Label>
            <Textarea
              id="description"
              name="description"
              placeholder="Create stripe webhook endpoint..."
              required
            />
          </div>

          <SubmitButton className="w-full max-w-full">Create</SubmitButton>
        </form>
      </DialogContent>
    </Dialog>
  );
};
