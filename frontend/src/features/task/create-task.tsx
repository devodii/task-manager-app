"use client";

import * as React from "react";

import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Textarea } from "@/components/ui/textarea";
import { Task } from "@/types";
import { useSearchParams, useRouter } from "next/navigation";

interface Props {
  children?: React.ReactNode;
  action?: "create" | "edit";
  metadata?: Task;
  defaultOpen?: boolean;
}

export const CreateTask = ({
  children: trigger,
  defaultOpen,
}: Partial<Props>) => {
  const titleRef = React.useRef<HTMLTextAreaElement>();
  const descriptionRef = React.useRef<HTMLInputElement>();
  const [title, setTitle] = React.useState("");

  const [isOpen, setIsOpen] = React.useState(defaultOpen ?? false);

  const searchParams = useSearchParams();
  const router = useRouter();

  const handleClearParams = () => {
    const params = new URLSearchParams(searchParams);
    params.delete("task");
    router.replace("/dashboard");
  };

  React.useEffect(() => {
    if (titleRef.current) {
      titleRef.current.style.height = "auto";
      titleRef.current.style.height = titleRef.current.scrollHeight + "px";
    }
  }, [titleRef, title]);

  return (
    <Sheet
      open={isOpen}
      onOpenChange={(val) => {
        setIsOpen(val);
        handleClearParams();
      }}
    >
      {trigger && <SheetTrigger>{trigger}</SheetTrigger>}

      <SheetContent className="min-w-[400px]">
        <form action={(d) => console.log({ d })}>
          <Textarea
            className="overflow-y-hidden font-bold text-3xl border-none outline-none ring-none focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-2xl placeholder:font-semibold placeholder:text-gray-600"
            autoFocus
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            ref={titleRef as any}
            placeholder="Task title"
            onKeyPress={(e) => {
              if (e.key == "Enter") {
                descriptionRef.current?.focus();
              }
            }}
          />

          <Input
            className="min-h-max overflow-y-hidden text-xl border-none outline-none ring-none focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-xl placeholder:text-gray-500"
            placeholder="description"
            ref={descriptionRef as any}
          />

          <div className="w-full flex items-end justify-end mt-7">
            <SubmitButton className="self-end max-w-[180px]">
              create task
            </SubmitButton>
          </div>
        </form>
      </SheetContent>
    </Sheet>
  );
};
