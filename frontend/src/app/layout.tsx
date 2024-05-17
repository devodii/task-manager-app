import { Toaster } from "@/components/ui/sonner";
import type { Metadata } from "next";
import * as React from "react";
import "./globals.css";
import { AppProvider } from "@/providers/app-provider";

import { Analytics } from "@vercel/analytics/react";

export const metadata: Metadata = {
  title: "Task Manager App",
  description: "The Open Source Linear Alternative",
};

export default function RootLayout({ children }: React.PropsWithChildren) {
  return (
    <html lang="en">
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1"
        />
      </head>

      <body>
        <AppProvider>
          <main>{children}</main>
          <Analytics />
          <Toaster />
        </AppProvider>
      </body>
    </html>
  );
}
