"use client";

import { Wrapper } from "@/components/wrapper";

export default function ErrorPage() {
  return (
    <Wrapper>
      <section className="flex flex-col gap-4">
        <div className="text-2xl md:text-3xl text-center">
          500: Server Error
        </div>
        <span className="text-xl text-gray-800 text-center">
          Whoops, something went wrong on our servers.
        </span>
      </section>
    </Wrapper>
  );
}
