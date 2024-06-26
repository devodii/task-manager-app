import { getTeams } from "@/actions/team";
import { getWorkspaceMembers } from "@/actions/workpace";
import { Button } from "@/components/ui/button";
import { AssigneeCard } from "@task/assignee-card";
import { nanoid } from "nanoid";
import Link from "next/link";

import { getProfile } from "@/actions/profile";
import { CaretRight } from "./client";

export const dynamic = "force-dynamic";

export default async function TeamsPage() {
  const [teams, profile] = await Promise.all([getTeams(), getProfile()]);

  if (teams.length < 1) {
    return <div className="mt-4">You’re not in any team :)</div>;
  }

  return (
    <ul className="w-full grid grid-cols-1 gap-4 h-full">
      {teams.map(async (team: any) => {
        const members = await getWorkspaceMembers(team.workspace.id);
        return (
          <li key={team.id} className="flex-1">
            <Button
              className="group w-full border rounded-md px-6 py-2 flex group"
              asChild
              variant="ghost"
            >
              <Link href={`/dashboard/teams/${team.workspace.id}`}>
                <span className="w-full text-start text-black font-semibold">
                  {team.workspace.name}
                </span>

                <div className="flex items-center gap-1">
                  <div className="flex">
                    {members
                      .slice(0, 4)
                      .filter(
                        (member) => member.username !== profile?.data?.username
                      )
                      .map((member) => (
                        <div key={nanoid()} className="-ml-3">
                          <AssigneeCard
                            imgOnly
                            name={member.username}
                            url={member.imageUrl}
                            variant="md"
                          />
                        </div>
                      ))}
                    <div key={nanoid()} className="-ml-3">
                      <AssigneeCard
                        imgOnly
                        name={profile?.data?.username!}
                        url={profile?.data?.imageUrl!}
                        variant="md"
                      />
                    </div>
                  </div>
                  <CaretRight
                    size={18}
                    className="group-hover:translate-x-1 group-hover:duration-150"
                  />
                </div>
              </Link>
            </Button>
          </li>
        );
      })}
    </ul>
  );
}
