import { getProfile } from "@/actions/profile";
import { getWorkspace } from "@/actions/workpace";
import { GettingStarted } from "@dashboard/getting-started";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const [profile, workspace] = await Promise.all([
    getProfile(),
    getWorkspace(),
  ]);

  if (!profile?.data?.id) redirect("/onboarding");

  if (!workspace?.id)
    return <GettingStarted username={profile.data?.username} />;

  return (
    <div>
      Uhm.. It’s a bit empty here, please visit the workspace or teams tab
    </div>
  );
}
