import { Button } from "@ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@ui/dialog";
import * as React from "react";

interface Props {
  children: React.ReactNode;
  onDelete: () => void;
}

export const DeleteTask = ({ children: trigger, onDelete }: Props) => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent>
        <DialogHeader>Are you sure you want to delete this task?</DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <DialogClose className="w-full">
            <Button variant="outline" className="w-full">
              Cancel
            </Button>
          </DialogClose>
          <Button
            variant="destructive"
            onClick={() => {
              onDelete();
              setIsOpen(false);
            }}
          >
            <span>delete</span>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
