"use client";

import { toast } from "sonner";

export const copy = async (text: string, cb?: () => void) => {
  try {
    await navigator.clipboard.writeText(text);

    cb?.();
  } catch (err) {
    toast("failed to copy!");
  }
};
