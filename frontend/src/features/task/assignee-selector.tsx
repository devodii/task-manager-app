"use client";

import { Check, ChevronsUpDown } from "lucide-react";
import * as React from "react";

import { Button } from "@/components/ui/button";
import { useWorkspaceMembers } from "@/hooks/use-workspace-member";
import { parseElementsContext } from "@/lib/context";
import { cn } from "@/lib/utils";
import { Command, CommandGroup, CommandItem } from "@ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@ui/popover";
import { CommandEmpty, CommandInput } from "cmdk";
import { AssigneeCard } from "./assignee-card";

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
  const { setAssignees, assignees } = useAssignee();

  const [value, setValue] = React.useState(assignees[0]?.value ?? "");
  const [open, setOpen] = React.useState(false);

  const { members: workspaceMembers } = useWorkspaceMembers();

  const members = workspaceMembers.map((member) => ({
    value: member.username,
    label: member.username,
    img: member.imageUrl,
  }));

  const currMember = members.find(
    (member) => member.value.toLowerCase() == value.toLowerCase()
  );

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        {value ? (
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-[300px] max-h-[35px] justify-between"
          >
            <AssigneeCard
              name={currMember?.value!}
              url={currMember?.img!}
              variant="md"
            />

            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        ) : (
          <button className="bg-none text-muted-foreground ring-0 border-none text-[14px]">
            Empty
          </button>
        )}
      </PopoverTrigger>
      <PopoverContent
        className={cn(
          "w-[300px] ml-12 px-0 py-2.5 ",
          value.length < 1 && "-mt-[23px] ml-60"
        )}
      >
        <Command>
          <CommandInput
            placeholder="Search for a person..."
            className="ml-2 pb-0.5 w-full outline-none placeholder:text-muted-foreground placeholder:text-[14px] px-2.5 flex-1 overflow-y-hidden border-none ring-none focus-visible:ring-0 focus-visible:ring-offset-0"
          />
          <p className="border-t w-full text-muted-foreground text-[13px] py-1 px-5 mt-0.5">
            Select one of these persons
          </p>
          <CommandEmpty className="mt-2 text-[13px] text-muted-foreground text-center">
            member not found
          </CommandEmpty>
          <CommandGroup>
            {members.map((member) => (
              <CommandItem
                key={member.value}
                value={member.value}
                onSelect={(currentValue) => {
                  setValue(currentValue === value ? "" : currentValue);
                  setAssignees([member]);
                  setOpen(false);
                }}
                className="cursor-pointer flex items-center justify-between w-full"
              >
                <AssigneeCard
                  name={member.value}
                  url={member.img}
                  variant="md"
                />

                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    value.toLowerCase() === member.value.toLowerCase()
                      ? "opacity-100"
                      : "opacity-0"
                  )}
                />
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

AssigneeSelector.displayName = "AssigneeSelector";

export { AssigneeProvider, AssigneeSelector, useAssignee };
