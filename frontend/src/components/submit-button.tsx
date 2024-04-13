"use client";

import { cn } from "@/lib/utils";
import { Button, ButtonProps } from "@ui/button";
import { useFormStatus } from "react-dom";
import { CgSpinnerAlt } from "react-icons/cg";

export const SubmitButton = ({ children, className, ...rest }: ButtonProps) => {
  const { pending } = useFormStatus();

  return (
    <Button
      className={cn(
        `text-white w-full justify-center gap-4 items-center font-semibold ${
          pending ? "cursor-not-allowed" : ""
        }`,
        className
      )}
      aria-disabled={pending}
      type="submit"
      {...rest}
    >
      <span>{children}</span>
      {pending && <CgSpinnerAlt className="animate-spin" size={20} />}
    </Button>
  );
};
