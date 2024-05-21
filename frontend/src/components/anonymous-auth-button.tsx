"use client";

import { signInAsFakeUser } from "@/actions/user";
import { ButtonProps } from "@ui/button";
import { SubmitButton } from "./submit-button";
import { useSearchParams } from "next/navigation";

export const AnonymousAuthButton = ({ className, ...rest }: ButtonProps) => {
  const searchParams = useSearchParams();

  const nextPath = searchParams.get("next");

  return (
    <form action={signInAsFakeUser} className="w-full">
      <input className="hidden" name="next" value={nextPath!} />

      <SubmitButton className={className} {...rest}>
        Login anonymously
      </SubmitButton>
    </form>
  );
};
