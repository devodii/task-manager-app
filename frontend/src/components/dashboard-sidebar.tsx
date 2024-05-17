import { getUser } from "@/actions/user";
import { LinkButton } from "@/components/link-button";
import { Badge } from "@ui/badge";

export const DashboardSidebar = async () => {
  const user = await getUser();

  return (
    <ul className="flex flex-col gap-3 h-[80vh]">
      <li>
        <LinkButton label="My workspace" path="/dashboard/workspace" />
      </li>
      <li>
        <LinkButton label="Teams" path="/dashboard/teams" />
      </li>

      {user?.isAnonymous && (
        <li className="fixed bottom-4">
          <Badge>Anonymous</Badge>
        </li>
      )}
    </ul>
  );
};
