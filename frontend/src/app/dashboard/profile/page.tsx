import { getProfile } from "@/actions/profile";
import { ViewProfile } from "@profile/view-profile";

export const dynamic = "force-dynamic";

export default async function ProfilePage() {
  const profile = await getProfile();

  return <ViewProfile data={profile?.data!} />;
}
