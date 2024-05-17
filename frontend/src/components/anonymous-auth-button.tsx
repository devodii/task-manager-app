"use client";

import { signInAsFakeUser } from "@/actions/user";
import { ButtonProps } from "@ui/button";
import { SubmitButton } from "./submit-button";

export const AnonymousAuthButton = ({ className, ...rest }: ButtonProps) => (
  <form action={signInAsFakeUser} className="w-full">
    <SubmitButton className={className} {...rest}>
      Login anonymously
    </SubmitButton>
  </form>
);
