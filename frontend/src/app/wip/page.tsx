"use client";

import { sendFeedback } from "@/actions/feedback";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Wrapper } from "@/components/wrapper";
import * as React from "react";
import { toast } from "sonner";

export default function WorkInProgressPage() {
  const [email, setEmail] = React.useState("");

  return (
    <Wrapper>
      <div className="container flex flex-col gap-6 mx-auto px-6">
        <div className="text-2xl md:text-3xl text-center">
          ⚠️ This platform is heavily under construction
        </div>

        <div className="text-xl text-gray-800 text-center">
          Want to be amongst the first users to try the new features?
        </div>

        <form
          className="flex flex-col gap-2 w-full max-w-4xl mx-auto"
          onSubmit={async (e) => {
            e.preventDefault();
            const formdata = new FormData();
            formdata.append(
              "message",
              `hey, waiting for the new features. this is my email: ${email}`
            );

            const response = await sendFeedback(formdata);

            if (response?.id) {
              toast("Your request has been sent.", { position: "top-right" });
            } else {
              toast("request failed, please try again.", {
                position: "top-right",
              });
            }

            setEmail("");
          }}
        >
          <div className="space-y-1">
            <Label>Enter your email</Label>
            <Input
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              type="email"
            />
          </div>

          <Button className="text-white w-full justify-center gap-4 items-center font-semibold">
            remind me
          </Button>
        </form>
      </div>
    </Wrapper>
  );
}
