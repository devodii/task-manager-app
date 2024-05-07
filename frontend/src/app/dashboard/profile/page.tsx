import { getProfile } from "@/actions/profile";
import { ViewProfile } from "@profile/view-profile";

export default async function ProfilePage() {
  const profile = await getProfile();

  return <ViewProfile data={profile?.data!} />;
}
