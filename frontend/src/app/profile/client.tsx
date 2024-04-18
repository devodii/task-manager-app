"use client";

import { Wrapper } from "@/components/wrapper";
import * as React from "react";

import { v2 as cloudinaryBase } from "cloudinary";

export default function ProfifleClient() {
  const [file, setFile] = React.useState<File | null>(null);

  async function uploadImage(e: any) {
    e.preventDefault();

    const arrayBuffer = await file?.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer!);

    console.log({ buffer });

    const tester = cloudinaryBase
      .config({ api_key: "422771432588932" })
      .upload(file)
      .then((res: any) => console.log({ res }));

    console.log({ tester });
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files && e.target.files[0];

    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  return (
    <Wrapper>
      <form onSubmit={uploadImage}>
        <label htmlFor="image" className="block font-semibold text-sm mb-2">
          Select an Image to Upload
        </label>

        <input
          id="image"
          className="block w-full border-slate-400 rounded focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          type="file"
          name="image"
          required
          onChange={handleInputChange}
        />

        <button className="bg-blue-500 rounded-md text-white px-4 py-2 mt-4">
          upload
        </button>
      </form>
    </Wrapper>
  );
}
