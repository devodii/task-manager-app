"use client";

import { Button } from "@/components/ui/button";
import { Wrapper } from "@/components/wrapper";
import { Profile } from "@/types";
import { CreateProfile } from "@profile/create-profile";
import { motion } from "framer-motion";

interface Props {
  next?: string;
  profile?: Profile;
}

export const OnboardingClient = ({ next, profile }: Props) => {
  return (
    <Wrapper as="section">
      <div className="flex flex-col gap-4 w-full max-w-4xl mx-auto">
        <motion.div
          animate={{ x: 0, y: -100 }}
          className="font-medium text-2xl md:text-3xl text-center"
        >
          You’re almost set
        </motion.div>

        <CreateProfile metadata={profile} redirectTo={next}>
          <Button>create profile</Button>
        </CreateProfile>
      </div>
    </Wrapper>
  );
};
