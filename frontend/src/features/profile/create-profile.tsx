"use client";

import { createProfile } from "@/actions/profile";
import { SubmitButton } from "@/components/submit-button";
import { buttonVariants } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { Input } from "@ui/input";
import { Label } from "@ui/label";
import * as React from "react";
import { toast } from "sonner";

export const CreateProfile = ({
  children: trigger,
}: React.PropsWithChildren) => {
  const [imageSrc, setImageSrc] = React.useState(null);
  const [open, setOpen] = React.useState(false);

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

      const formdata = new FormData(e.currentTarget);

      const res = await createProfile(formdata);

      if (!res?.data?.id) {
        toast("An error occured while creating your profile.");
      }
    } catch (error) {
    } finally {
      setOpen(false);
    }
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}

      <DialogContent className="max-w-5xl flex items-center justify-center">
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

            <SubmitButton>create</SubmitButton>
          </form>
        </section>
      </DialogContent>
    </Dialog>
  );
};
