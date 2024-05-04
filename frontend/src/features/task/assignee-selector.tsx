"use client";

import { X } from "lucide-react";
import * as React from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useWorkspaceMembers } from "@/contexts/workspace-members-context";
import { parseElementsContext } from "@/lib/context";
import { getInitials } from "@/lib/utils";
import { Badge } from "@ui/badge";
import { Command, CommandGroup, CommandItem } from "@ui/command";
import { Command as CommandPrimitive } from "cmdk";

// @ts-ignore
const AssigneeContext = React.createContext<{
  assignees: any[];
  setAssignees: React.Dispatch<React.SetStateAction<any[]>>;
}>();

const AssigneeProvider = ({ children }: React.PropsWithChildren) => {
  const [assignees, setAssignees] = React.useState<any[]>([]);

  return (
    <AssigneeContext.Provider value={{ assignees, setAssignees }}>
      {children}
    </AssigneeContext.Provider>
  );
};

const useAssignee = () => {
  const context = React.useContext(AssigneeContext);

  return parseElementsContext(context, "assignee context");
};

const AssigneeSelector = () => {
  const inputRef = React.useRef<HTMLInputElement>(null);

  const [open, setOpen] = React.useState(false);
  const [inputValue, setInputValue] = React.useState("");

  const { assignees: selected, setAssignees: setSelected } = useAssignee();

  const { members: workspaceMembers } = useWorkspaceMembers();

  const members = workspaceMembers.map((member) => ({
    value: member.username,
    label: member.username,
    img: member.imageUrl,
  }));

  const handleUnselect = React.useCallback(
    (member: (typeof members)[number]) => {
      setSelected((prev: any) =>
        prev.filter((s: any) => s.value !== member.value)
      );
    },
    []
  );

  const handleKeyDown = React.useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      const input = inputRef.current;
      if (input) {
        if (e.key === "Delete" || e.key === "Backspace") {
          if (input.value === "") {
            setSelected((prev: any) => {
              const newSelected = [...prev];
              newSelected.pop();
              return newSelected;
            });
          }
        }
        // This is not a default behaviour of the <input /> field
        if (e.key === "Escape") {
          input.blur();
        }
      }
    },
    []
  );

  const selectables = members.filter(
    (member) => !selected.some((s) => s.value === member.value)
  );

  return (
    <Command
      onKeyDown={handleKeyDown}
      className="overflow-visible bg-transparent"
    >
      <div className="group border border-input px-3 py-2 text-sm ring-offset-background rounded-md focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2">
        <div className="flex gap-1 flex-wrap">
          {selected.map((member) => {
            return (
              <Badge
                key={member.value}
                variant="secondary"
                className="flex items-center gap-1"
              >
                <AssigneeInformation
                  name={member.value}
                  url={member.img}
                  variant="md"
                />
                <button
                  className="ml-1 ring-offset-background rounded-full outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleUnselect(member);
                    }
                  }}
                  onMouseDown={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                  }}
                  onClick={() => handleUnselect(member)}
                >
                  <X className="h-3 w-3 text-muted-foreground hover:text-foreground" />
                </button>
              </Badge>
            );
          })}
          <CommandPrimitive.Input
            ref={inputRef}
            value={inputValue}
            onValueChange={setInputValue}
            onBlur={() => setOpen(false)}
            onFocus={() => setOpen(true)}
            placeholder="Select member..."
            className="ml-2 w-full outline-none placeholder:text-muted-foreground flex-1 overflow-y-hidden border-none ring-none focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:font-semibold"
          />
        </div>
      </div>
      <div className="relative mt-2">
        {open && selectables.length > 0 ? (
          <div className="absolute w-full z-10 top-0 rounded-md border bg-popover text-popover-foreground shadow-md outline-none animate-in">
            <CommandGroup className="h-full overflow-auto">
              {selectables.map((member) => {
                return (
                  <CommandItem
                    key={member.value}
                    onMouseDown={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                    }}
                    onSelect={() => {
                      setInputValue("");
                      setSelected((prev) => [...prev, member]);
                    }}
                    className="cursor-pointer flex items-center gap-2"
                  >
                    <AssigneeInformation
                      name={member.value}
                      url={member.img}
                      variant="md"
                    />
                  </CommandItem>
                );
              })}
            </CommandGroup>
          </div>
        ) : null}
      </div>
    </Command>
  );
};

AssigneeSelector.displayName = "AssigneeSelector";

interface AssigneeImageProps {
  name: string;
  url: string;
  variant?: "sm" | "md";
}

const AssigneeInformation = React.memo(
  ({ name, url, variant = "sm" }: AssigneeImageProps) => (
    <div className="flex items-center gap-1">
      <Avatar className={variant == "sm" ? "size-4" : "size-6"}>
        <AvatarImage src={url} className="obect-cover" />
        <AvatarFallback className="uppercase font-semibold select-none cursor-pointer bg-gray-300 flex items-center justify-center text-center text-[14px]">
          {getInitials(name)}
        </AvatarFallback>
      </Avatar>

      <span className="text-[14px] font-medium">{name}</span>
    </div>
  )
);

AssigneeInformation.displayName = "AssigneeInformation";

export { AssigneeInformation, AssigneeProvider, AssigneeSelector, useAssignee };
