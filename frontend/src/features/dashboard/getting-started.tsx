"use client";

import * as React from "react";

import { Button } from "@/components/ui/button";
import { Check } from "@phosphor-icons/react";
import { Progress } from "@ui/progress";
import { CreateWorkspace } from "@workspace/create-workspace";

export const GettingStarted = () => {
  const [progress, setProgress] = React.useState(0);

  React.useEffect(() => {
    const timer = setTimeout(() => setProgress(50), 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="border rounded-md flex flex-col gap-4 w-full p-5 h-full">
      <h3 className="text-2xl md:text-3xl font-semibold">Getting Started</h3>

      <p>Learn the basics of using this platform in a few seconds.</p>

      <Progress value={progress} className="w-full md:w-1/2 h-2" />

      <div className="w-full flex items-center justify-between">
        <s className="text-gray-800">Create a profile</s>
        <div className="bg-green-500 size-[20px] p-0.5 rounded-full flex items-center justify-center">
          <Check size={20} />
        </div>
      </div>

      <div className="w-full flex items-center justify-between">
        <p>Create your workspace</p>

        <CreateWorkspace>
          <Button className="w-full max-w-[100px]">create</Button>
        </CreateWorkspace>
      </div>
    </div>
  );
};
