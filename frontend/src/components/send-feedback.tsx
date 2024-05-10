"use client";

import { sendFeedback } from "@/actions/feedback";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@ui/drawer";
import { Input } from "@ui/input";
import * as React from "react";
import { SubmitButton } from "./submit-button";
import { Button } from "./ui/button";
import { usePathname } from "next/navigation";
import { toast } from "sonner";

export const SendFeedback = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const pathname = usePathname();

  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
      <DrawerTrigger asChild>
        <Button variant="outline" className="fixed bottom-6 right-6 z-10">
          Give feedback
        </Button>
      </DrawerTrigger>
      <DrawerContent className="space-y-4 pb-4 lg:pb-9">
        <DrawerHeader>
          <DrawerTitle className="text-center lg:text-3xl">
            What feature would you like to see on this page?
          </DrawerTitle>
          <DrawerDescription className="text-center lg:text-xl">
            Type it, and.. I’ll build it for you 🤩
          </DrawerDescription>
        </DrawerHeader>

        <form
          className="w-full flex flex-col gap-2 max-w-2xl mx-auto px-4"
          onSubmit={async (e) => {
            e.preventDefault();

            setIsOpen(false);

            const formdata = new FormData(e.currentTarget);
            const response = await sendFeedback(formdata);

            if (response?.success) {
              toast("Your feedback has been received 🔥", {
                position: "top-right",
              });
            } else {
              toast("An error occured while sending feedback", {
                position: "top-right",
              });
            }
          }}
        >
          <Input placeholder="" name="message" required />
          <Input
            placeholder=""
            name="path"
            value={pathname}
            className="hidden"
          />
          <SubmitButton>send feedack</SubmitButton>
        </form>
      </DrawerContent>
    </Drawer>
  );
};
