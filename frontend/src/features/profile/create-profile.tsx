"use client";

import { createProfile } from "@/actions/profile";
import { Button, buttonVariants } from "@/components/ui/button";
import { Wrapper } from "@/components/wrapper";
import { cn } from "@/lib/utils";
import { Profile } from "@/types";
import { Input } from "@ui/input";
import { Label } from "@ui/label";
import * as React from "react";
import { CgSpinnerAlt } from "react-icons/cg";
import { toast } from "sonner";
import { ViewProfile } from "./view-profile";

export const CreateProfile = () => {
  const [imageSrc, setImageSrc] = React.useState(null);
  const [isCreating, setIsCreating] = React.useState(false);
  const [isCreated, setIsCreated] = React.useState(false);
  const [profileData, setProfileData] = React.useState<Profile | null>(null);

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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsCreating(true);

    const formdata = new FormData(e.currentTarget);
    const response = await createProfile(formdata);

    if (response.status) {
      setProfileData(response.data);
      setIsCreated(true);
    }

    setIsCreating(false);

    toast("Your profile has been created", { position: "top-right" });
  };

  if (isCreated) {
    return <ViewProfile data={profileData as Profile} />;
  }

  return (
    <Wrapper
      className="justify-start my-12 md:my-16 lg:my-20 flex-col gap-12"
      as="section"
    >
      <h2 className="text-2xl md:text-3xl font-semibold text-center">
        Create your profile
      </h2>

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-2xl mx-auto space-y-6"
      >
        <div className="w-full flex-col flex items-center justify-center">
          <input
            type="file"
            name="image"
            id="image"
            className="hidden"
            accept="image/png, image/jpeg, image/jpg"
            onChange={handleImageChange}
          />

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
            </>
          )}
        </div>

        <div className="space-y-1">
          <Label htmlFor="username">Your username</Label>
          <Input required name="username" id="username" />
        </div>

        <Button
          className={cn(
            `text-white w-full justify-center gap-4 items-center font-semibold ${
              isCreating ? "cursor-not-allowed" : ""
            }`
          )}
          aria-disabled={isCreating}
          type="submit"
        >
          <span>Submit</span>
          {isCreating && <CgSpinnerAlt className="animate-spin" size={20} />}
        </Button>
      </form>
    </Wrapper>
  );
};
