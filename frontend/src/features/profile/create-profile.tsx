"use client";

import * as React from "react";

import { createProfile } from "@/actions/profile";
import { Button, buttonVariants } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { Profile } from "@/types";
import { Input } from "@ui/input";
import { Label } from "@ui/label";
import { toast } from "sonner";

import { BlurImage } from "@/components/blur-image";
import Link from "next/link";

interface Props {
  children: React.ReactNode;
  metadata?: Profile;

  redirectTo?: string;
}

export const CreateProfile = ({
  children: trigger,
  metadata: profile,
  redirectTo,
}: Props) => {
  const [isCreating, setIsCreating] = React.useState(false);
  const [imageSrc, setImageSrc] = React.useState(null);
  const [viewProfile, setViewProfile] = React.useState(false);

  const handleImageChange = (e: any) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setImageSrc(reader.result as any);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleCreate = async (e: any) => {
    try {
      e.preventDefault();
      setIsCreating(true);

      const formdata = new FormData(e.currentTarget);

      const res = await createProfile(formdata);

      if (!res?.data?.id) {
        toast("An error occured while creating your profile.");
      }
    } catch (error) {
    } finally {
      setIsCreating(false);
    }
  };

  React.useEffect(() => {
    if (profile?.id) {
      setViewProfile(true);
    }
  }, [profile]);

  return (
    <Dialog>
      {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}

      <DialogContent className="max-w-5xl flex items-center justify-center max-h-[450px]">
        {viewProfile ? (
          <section className="justify-start my-12 md:my-16 lg:my-20 flex-col gap-12 w-full">
            <h2 className="text-2xl md:text-3xl font-semibold text-center mb-6">
              Your profile
            </h2>
            <div className="w-full mx-auto max-w-xl space-y-6">
              <figure className="flex items-center justify-center flex-col gap-2">
                <BlurImage
                  src={profile?.imageUrl!}
                  alt={`${profile?.username} on task manager app`}
                  width={150}
                  height={150}
                  quality={80}
                  className="rounded-full size-[150px] object-cover text-[50px]"
                  fallbackText={profile?.username[0]}
                />
              </figure>

              <div className="flex gap-2 items-center">
                <span>Name:</span>
                <span>{profile?.username}</span>
              </div>

              <Button className="w-full" asChild>
                <Link href={redirectTo ?? "/dashboard"}>Next</Link>
              </Button>
            </div>
          </section>
        ) : (
          <section className="justify-start my-12 md:my-16 lg:my-20 flex-col gap-12 w-full">
            <h2 className="text-2xl md:text-3xl font-semibold text-center mb-6">
              Create your profile
            </h2>

            <form
              onSubmit={handleCreate}
              className="w-full mx-auto max-w-xl space-y-6"
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
                        buttonVariants({ variant: "ghost" }),
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
                <Input
                  required
                  name="username"
                  id="username"
                  className="outline-blue-500"
                />
              </div>

              <Button
                type="submit"
                className="w-full text-white font-semibold"
                disabled={isCreating}
              >
                create
              </Button>
            </form>
          </section>
        )}
      </DialogContent>
    </Dialog>
  );
};
