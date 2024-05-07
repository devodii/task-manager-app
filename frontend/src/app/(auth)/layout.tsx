import * as React from "react";

import { getUser } from "@/actions/user";
import { redirect } from "next/navigation";

interface Props {
  children: React.ReactNode;
}

export default async function AuthLayout({ children }: Readonly<Props>) {
  const user = await getUser();

  if (user?.id) redirect("/dashboard");

  return <>{children}</>;
}
