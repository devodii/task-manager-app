"use client";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@ui/button";
import { Label } from "@ui/label";
import * as React from "react";

export const ImageUploader = () => {
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
  );
};
