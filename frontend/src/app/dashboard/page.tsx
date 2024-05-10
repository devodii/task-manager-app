import { getProfile } from "@/actions/profile";
import { getWorkspace } from "@/actions/workpace";
import { Button } from "@/components/ui/button";
import { CreateWorkspace } from "@workspace/create-workspace";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const [profile, workspace] = await Promise.all([
    getProfile(),
    getWorkspace(),
  ]);

  if (!profile?.data?.id) redirect("/onboarding");

  if (!workspace?.id) {
    return (
      <div className="flex flex-col gap-6 w-full justify-center items-center">
        <h4 className="text-2xl md:text-3xl font-semibold text-center mt-8 md:mt-14">
          One last step..
        </h4>
        <div className="w-full flex items-center justify-center mt-0">
          <CreateWorkspace username={profile?.data?.username!}>
            <Button variant="outline" className="w-full max-w-xs">
              create a workspace
            </Button>
          </CreateWorkspace>
        </div>
      </div>
    );
  }
  return (
    <div>
      Uhm.. It’s a bit empty here, please visit the workspace or teams tab
    </div>
  );
}
