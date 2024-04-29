"use client";

import * as React from "react";
import dynamic from "next/dynamic";

export const NoSSRComp = ({ children }: React.PropsWithChildren) => (
  <>{children}</>
);

export const ClientProvider = dynamic(() => Promise.resolve(NoSSRComp), {
  loading: () => <div>Loading client component..</div>,
  ssr: false,
});
