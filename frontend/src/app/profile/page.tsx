import { getProfile } from "@/actions/profile";
import { CreateProfile } from "@profile/create-profile";
import { ViewProfile } from "@profile/view-profile";

export default async function ProfilePage() {
  const profile = await getProfile();

  console.log({ profile });

  if (!profile?.data?.id) return <CreateProfile />;

  return <ViewProfile data={profile.data} />;
}
