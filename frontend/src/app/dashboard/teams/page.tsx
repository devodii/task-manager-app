import { getTeams } from "@/actions/team";

export default async function TeamsPage() {
  const teams = await getTeams();

  return <div>{JSON.stringify(teams, null, 2)}</div>;
}
