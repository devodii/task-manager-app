import { Toaster } from "@/components/ui/sonner";
import type { Metadata } from "next";
import * as React from "react";
import "./globals.css";
import { AppProvider } from "@/providers/app-provider";

export const metadata: Metadata = {
  title: "Task Manager App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }: React.PropsWithChildren) {
  return (
    <html lang="en">
      <body>
        <AppProvider>
          <main>{children}</main>
          <Toaster />
        </AppProvider>
      </body>
    </html>
  );
}
