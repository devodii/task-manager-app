"use client";

import { createProfile } from "@/actions/profile";
import { SubmitButton } from "@/components/submit-button";
import { buttonVariants } from "@/components/ui/button";
import { Wrapper } from "@/components/wrapper";
import { cn } from "@/lib/utils";
import { Input } from "@ui/input";
import { Label } from "@ui/label";
import * as React from "react";

export const CreateProfile = () => {
  const [imageSrc, setImageSrc] = React.useState(null);

  const handleImageChange = (e: any) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      console.log("displaying image...");
    };

    reader.onloadend = () => {
      setImageSrc(reader.result as any);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  return (
    <Wrapper
      className="justify-start my-12 md:my-16 lg:my-20 flex-col gap-12"
      as="section"
    >
      <h2 className="text-2xl md:text-3xl font-semibold text-center">
        Create your profile
      </h2>

      <form
        action={createProfile}
        className="w-full max-w-2xl mx-auto space-y-6"
      >
        <div className="w-full flex-col flex items-center justify-center">
          {imageSrc ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={imageSrc}
              alt="Preview"
              className="size-[150px] object-cover mx-auto rounded-full"
            />
          ) : (
            <>
              <Label
                htmlFor="image"
                className={cn(
                  buttonVariants({ variant: "default" }),
                  "bg-opacity-90 cursor-pointer"
                )}
              >
                Upload a photo
              </Label>
              <input
                type="file"
                name="image"
                id="image"
                className="hidden"
                accept="image/png, image/jpeg, image/jpg"
                onChange={handleImageChange}
              />
            </>
          )}
        </div>

        <div className="space-y-1">
          <Label htmlFor="username">Your username</Label>
          <Input required name="username" id="username" />
        </div>

        <SubmitButton>Submit</SubmitButton>
      </form>
    </Wrapper>
  );
};
