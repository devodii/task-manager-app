import { LinkButton } from "@/components/link-button";

export const DashboardSidebar = () => {
  return (
    <ul className="flex flex-col gap-3">
      <li>
        <LinkButton label="My workspace" path="/dashboard/workspace" />
      </li>
      <li>
        <LinkButton label="Teams" path="/dashboard/teams" />
      </li>
    </ul>
  );
};
