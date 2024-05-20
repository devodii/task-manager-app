import { LinkButton } from "@/components/link-button";
import { User } from "@/types";
import { Badge } from "@ui/badge";

interface Props {
  user: User;
}

export const DashboardSidebar = ({ user }: Props) => {
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
