import { getProfile } from "@/actions/profile";
import { OnboardingClient } from "./client";

interface Props {
  searchParams?: {
    next: string;
  };
}

export default async function OnboardingPage({ searchParams }: Props) {
  const profile = await getProfile();

  return <OnboardingClient next={searchParams?.next} profile={profile?.data} />;
}
