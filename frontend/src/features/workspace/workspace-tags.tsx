"use client";

import { Check, ChevronsUpDown } from "lucide-react";
import * as React from "react";

import { Button } from "@/components/ui/button";
import { useWorkspaceTags } from "@/hooks/use-workspace-tags";
import { cn } from "@/lib/utils";
import { Command, CommandGroup, CommandItem } from "@ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@ui/popover";
import { CommandEmpty, CommandInput } from "cmdk";
import { Tag } from "@/types";

export const WorkspaceTags = () => {
  const { tags, setCurrentlySelectedTag, currentlySelectedTag } =
    useWorkspaceTags();

  const [value, setValue] = React.useState(currentlySelectedTag.name);
  const [open, setOpen] = React.useState(false);

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
            {value}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        ) : (
          <button className="bg-none text-muted-foreground ring-0 border-none text-[14px] min-w-full text-start">
            Empty
          </button>
        )}
      </PopoverTrigger>
      <PopoverContent
        className={cn(
          "w-[300px] ml-12 px-0 py-2.5 ",
          value.length < 1 && "-mt-[23px] -ml-64"
        )}
      >
        <Command>
          <CommandInput
            placeholder="Find tag.."
            className="ml-2 pb-0.5 w-full outline-none placeholder:text-muted-foreground placeholder:text-[14px] px-2.5 flex-1 overflow-y-hidden border-none ring-none focus-visible:ring-0 focus-visible:ring-offset-0"
          />

          <CommandEmpty className="text-[14px]">Tag not found</CommandEmpty>
          <CommandGroup>
            {tags?.map(({ color, name }: Tag) => (
              <CommandItem
                key={name}
                value={name}
                onSelect={(currentValue) => {
                  setValue(currentValue === value ? "" : currentValue);
                  setOpen(false);
                  setCurrentlySelectedTag({ color, name });
                }}
                className="cursor-pointer flex items-center justify-between w-full"
              >
                <span
                  className="text-white text-[12px] rounded-sm px-1 py-[1px] bg-opacity-70"
                  style={{ backgroundColor: color }}
                >
                  {name}
                </span>

                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    value.toLowerCase() === name.toLowerCase()
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
