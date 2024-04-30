"use client";

import * as React from "react";

import { createTask, updateTask } from "@/actions/task";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Textarea } from "@/components/ui/textarea";
import { Task } from "@/types";
import { useRouter, useSearchParams } from "next/navigation";


interface Props {
  children?: React.ReactNode;
  action?: "create" | "edit";
  metadata?: Task;
  defaultOpen?: boolean;
}

export const CreateTask = ({
  children: trigger,
  defaultOpen,
  action = "create",
  metadata,
}: Partial<Props>) => {
  const titleRef = React.useRef<HTMLTextAreaElement>();
  const descriptionRef = React.useRef<HTMLInputElement>();
  const [title, setTitle] = React.useState(metadata?.title ?? "");

  const [isOpen, setIsOpen] = React.useState(defaultOpen ?? false);

  const searchParams = useSearchParams();
  const router = useRouter();

  const handleClearParams = () => {
    const params = new URLSearchParams(searchParams);

    const task = params.get("task");

    if (task) {
      params.delete("task");
      router.replace("/dashboard");
    }
  };

  React.useEffect(() => {
    if (titleRef.current) {
      titleRef.current.style.height = "auto";
      titleRef.current.style.height = titleRef.current.scrollHeight + "px";
    }
  }, [titleRef, title]);

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
    callback: any
  ) => {
    e.preventDefault();

    const formdata = new FormData(e.currentTarget);

    action == "create"
      ? await createTask(formdata)
      : await updateTask(formdata, metadata?.id as number);

    callback?.();
  };

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
        <form
          onSubmit={(e: any) =>
            handleSubmit(e, () => {
              setIsOpen(false);
            })
          }
        >
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
            name="title"
          />

          <Input
            className="min-h-max overflow-y-hidden text-xl border-none outline-none ring-none focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-xl placeholder:text-gray-500"
            placeholder="description"
            ref={descriptionRef as any}
            name="description"
            defaultValue={metadata?.description}
          />

          <div className="w-full flex items-end justify-end mt-7">
            <SubmitButton className="self-end max-w-[180px]">
              {action == "create" ? "create task" : "edit task"}
            </SubmitButton>
          </div>
        </form>
      </SheetContent>
    </Sheet>
  );
};
