"use client";

import { cn } from "@/lib/utils";
import { Input } from "@ui/input";
import { Label } from "@ui/label";
import Link from "next/link";
import * as React from "react";
import { CgSpinnerAlt } from "react-icons/cg";
import { toast } from "sonner";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import { Wrapper } from "./wrapper";
import { SubmitButton } from "./submit-button";

interface Props {
  variant: keyof typeof content;
  action: (formdata: FormData) => any;
  next?: string;
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
  action,
  next,
}: Partial<Props>) => {
  return (
    <Wrapper
      className="h-full w-screen flex gap-6 px-6 md:px-12 lg:px-20"
      as="section"
    >
      <div className="w-full md:w-3/5 flex flex-col gap-6">
        <h2 className="text-center font-semibold text-3xl">
          {content[variant].header}
        </h2>
        <form
          className="grid grid-cols-1 gap-4 w-full max-w-3xl mx-auto"
          action={action}
        >
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input name="email" id="email" required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input name="password" id="password" type="password" required />
          </div>

          <input name="next" className="hidden" value={next} />

          <SubmitButton>{content[variant].cta}</SubmitButton>
        </form>

        {variant === "sign-in" ? (
          <div className="flex items-center justify-center gap-1">
            <span> Dont have an account yet?</span>{" "}
            <Link href="/sign-up" className="underline underline-offset-2">
              Sign up
            </Link>
          </div>
        ) : (
          <div className="flex items-center justify-center gap-1">
            <span>Already have an accont?</span>{" "}
            <Link href="/sign-in" className="underline underline-offset-2">
              Sign in
            </Link>
          </div>
        )}
      </div>

      <div className="hidden md:flex md:w-2/5 h-screen gap-12 items-center">
        <Separator className="h-full w-px" />
        <div className="text-2xl ">Task Manager</div>
      </div>
    </Wrapper>
  );
};
