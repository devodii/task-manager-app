import { getProfile } from "@/actions/profile";
import { getUser } from "@/actions/user";
import { redirect } from "next/navigation";
import { OnboardingClient } from "./client";

interface Props {
  searchParams?: {
    next: string;
  };
}

export default async function OnboardingPage({ searchParams }: Props) {
  const [user, profile] = await Promise.all([getUser(), getProfile()]);

  if (!user?.id) redirect("/");

  return <OnboardingClient next={searchParams?.next} profile={profile?.data} />;
}
