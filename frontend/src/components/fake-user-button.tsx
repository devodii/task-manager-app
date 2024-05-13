"use client";

import { createFakeUser } from "@/actions/user";
import { Button } from "./ui/button";

export const TryAnonymously = () => {
  const handleCreate = async () => {
    const response = await createFakeUser();
    console.log({ response });
  };

  return <Button onClick={handleCreate}>Try anonymously</Button>;
};
