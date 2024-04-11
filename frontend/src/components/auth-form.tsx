"use client";

import { Button } from "@ui/button";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@ui/dialog";
import { Input } from "@ui/input";
import { Label } from "@ui/label";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import * as React from "react";
import { SubmitButton } from "./submit-button";

interface Props {
  variant: keyof typeof content;
  children: React.ReactNode;
  open: boolean;
  action: (formdata: FormData) => any;
}

const content = {
  "sign-up": {
    header: "Create an account",
    cta: "signup",
  },
  "sign-in": {
    header: "Login",
    cta: "login",
  },
};

export const AuthForm = ({
  variant = "sign-in",
  children: trigger,
  open,
  action,
}: Partial<Props>) => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const pathname = usePathname();

  const handleCloseModal = () => {
    const params = new URLSearchParams(searchParams);
    params.delete("requiresAuth");
    router.replace(`${pathname}?${params.toString()}`);
  };

  return (
    <Dialog defaultOpen={open} onOpenChange={handleCloseModal}>
      {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}

      <DialogContent
        className="w-screen max-w-2xl"
        onInteractOutside={(e) => e.preventDefault()}
      >
        <DialogTitle className="text-center font-semibold text-3xl">
          {content[variant].header}
        </DialogTitle>

        <form className="grid grid-cols-1 gap-4" action={action}>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input placeholder="odii@gmail.com" name="email" id="email" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input placeholder="******" name="password" id="password" />
          </div>

          <SubmitButton className="text-md w-full">
            {content[variant].cta}
          </SubmitButton>
        </form>
      </DialogContent>
    </Dialog>
  );
};
