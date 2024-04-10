"use client";

import { Button } from "@ui/button";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@ui/dialog";
import { Input } from "@ui/input";
import { Label } from "@ui/label";
import * as React from "react";

interface Props {
  variant: keyof typeof content;
  children: React.ReactNode;
  open: boolean;
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
}: Partial<Props>) => {
  return (
    <Dialog defaultOpen={open}>
      {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}

      <DialogContent
        className="w-screen max-w-2xl"
        onInteractOutside={(e) => e.preventDefault()}
      >
        <DialogTitle className="text-center font-semibold text-3xl">
          {content[variant].header}
        </DialogTitle>

        <form
          className="grid grid-cols-1 gap-4"
          action={(e) => console.log("ww")}
        >
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input placeholder="odii@gmail.com" name="email" id="email" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input placeholder="******" name="password" id="password" />
          </div>

          <Button className="text-md w-full">{content[variant].cta}</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
