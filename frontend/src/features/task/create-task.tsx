"use client";

import * as React from "react";

import { createTask, updateTask } from "@/actions/task";
import { SubmitButton } from "@/components/submit-button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Textarea } from "@/components/ui/textarea";
import { Task } from "@/types";
import { AssigneeSelector, useAssignee } from "@task/assignee-selector";
import { useRouter, useSearchParams } from "next/navigation";

import { useTask } from "@/hooks/use-task";
import { useWorkspaceTags } from "@/hooks/use-workspace-tags";
import { WorkspaceTags } from "@workspace/workspace-tags";
import { HiUsers } from "react-icons/hi2";
import { PiTagSimpleFill } from "react-icons/pi";

interface Props {
  children?: React.ReactNode;
  action?: "create" | "edit";
  metadata?: Task;
  defaultOpen?: boolean;
  defaultTitle?: string;
  workspaceId: string;
}

export const CreateTask = ({
  children: trigger,
  defaultOpen,
  action = "create",
  metadata,
  defaultTitle = "",
  workspaceId,
}: Partial<Props>) => {
  const titleRef = React.useRef<HTMLTextAreaElement>();
  const descriptionRef = React.useRef<HTMLInputElement>();
  const [title, setTitle] = React.useState(metadata?.title ?? defaultTitle);

  const [isOpen, setIsOpen] = React.useState(defaultOpen ?? false);

  const { assignees, setAssignees } = useAssignee();
  const { currentlySelectedTag, setCurrentlySelectedTag } = useWorkspaceTags();
  const { getStatus } = useTask();

  const searchParams = useSearchParams();
  const router = useRouter();

  const handleClearParams = () => {
    const params = new URLSearchParams(searchParams);

    const task = params.get("task");

    if (task) {
      params.delete("task");
      router.replace("/dashboard/workspace");
    }
  };

  React.useEffect(() => {
    if (titleRef.current) {
      titleRef.current.style.height = "auto";
      titleRef.current.style.height = titleRef.current.scrollHeight + "px";
    }
  }, [titleRef, title]);

  /**
   * update assignees to the existing ones that exists for a task.
   */
  React.useEffect(() => {
    const currentTag = metadata?.metadata?.tags?.[0];

    if (metadata?.assignee?.id) {
      metadata?.assignee.profileName
        ? setAssignees([
            {
              value: metadata?.assignee.profileName,
              label: metadata.assignee.profileName,
              img: metadata.assignee.profileImg,
            },
          ])
        : setAssignees([]);
    }

    if (currentTag?.name) {
      setCurrentlySelectedTag(currentTag);
    }
  }, [metadata, isOpen]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsOpen(false);

    const formdata = new FormData(e.currentTarget);

    if (action === "create") {
      setTitle("");
    }

    action == "create"
      ? await createTask(formdata)
      : await updateTask(formdata, metadata?.id as any);
  };

  return (
    <Sheet
      open={isOpen}
      onOpenChange={(val) => {
        setIsOpen(val);
        handleClearParams();
        setAssignees([]);
      }}
    >
      {trigger && (
        <SheetTrigger asChild className="cursor-pointer">
          {trigger}
        </SheetTrigger>
      )}

      <SheetContent className="min-w-[600px]">
        <form onSubmit={handleSubmit}>
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
            required
          />

          <div className="space-y-4 text-gray-600">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 w-[100px]">
                <HiUsers className="text-md md:text-xl" />
                <span className="text-[12px] md:text-[14px] font-medium">
                  Assignee
                </span>
              </div>

              <AssigneeSelector />
            </div>

            <div className="flex gap-4 items-center">
              <div className="flex items-center gap-2 w-[100px]">
                <PiTagSimpleFill className="rtext-md md:text-xl -rotate-[135deg]" />
                <span className="text-[12px] md:text-[14px] font-medium">
                  Tags
                </span>
              </div>
              <WorkspaceTags />
            </div>
          </div>

          <Textarea
            className="overflow-y-hidden h-full mt-6 w-full break-words min-h-max text-xl border-none outline-none ring-none focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-md placeholder:text-gray-500"
            placeholder="description"
            ref={descriptionRef as any}
            name="description"
            defaultValue={metadata?.description}
          />

          {assignees?.length > 0 && (
            <>
              <input
                name="assigneeName"
                className="hidden"
                value={assignees?.[0]?.value}
              />
              <input
                name="assigneeImg"
                className="hidden"
                value={assignees?.[0]?.img}
              />
            </>
          )}

          <input
            name="status"
            className="hidden"
            value={getStatus(metadata?.id)}
          />

          {metadata?.id && (
            <>
              <input name="taskId" value={metadata.id} className="hidden" />
              <input
                name="assigneeId"
                value={metadata.assignee?.id}
                className="hidden"
              />
            </>
          )}

          {assignees?.length > 0 && (
            <>
              <input
                name="assigneeName"
                className="hidden"
                value={assignees?.[0]?.value}
              />
              <input
                name="assigneeImg"
                className="hidden"
                value={assignees?.[0]?.img}
              />
            </>
          )}

          <input name="workspaceId" value={workspaceId} className="hidden" />
          <input
            name="tagName"
            value={currentlySelectedTag.name}
            className="hidden"
          />
          <input
            name="tagColor"
            value={currentlySelectedTag.color}
            className="hidden"
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
