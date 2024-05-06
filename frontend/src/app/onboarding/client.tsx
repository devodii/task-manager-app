"use client";

import { Button } from "@/components/ui/button";
import { Wrapper } from "@/components/wrapper";
import { CreateProfile } from "@/features/profile/create-profile";
import { ViewProfile } from "@/features/profile/view-profile";
import { Profile } from "@/types";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

interface Props {
  next?: string;
  profile?: Profile;
}

export const OnboardingClient = ({ next, profile }: Props) => {
  const router = useRouter();

  return (
    <Wrapper as="section">
      <div className="flex flex-col gap-4 w-full max-w-4xl mx-auto">
        <motion.div
          animate={{ x: 0, y: -100 }}
          className="font-medium text-2xl md:text-3xl text-center"
        >
          You’re almost set
        </motion.div>

        {profile?.id ? (
          <>
            <ViewProfile data={profile} />

            <Button
              className="w-full"
              variant="outline"
              onClick={() => router.push(next ?? "/dashboard")}
            >
              Next
            </Button>
          </>
        ) : (
          <CreateProfile>
            <Button>create profile</Button>
          </CreateProfile>
        )}
      </div>
    </Wrapper>
  );
};
