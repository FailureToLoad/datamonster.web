import { SurvivorTable } from "./survivor-table";
import { FetchSurvivors } from "./actions";

export default async function PopulationPage({
  params,
}: {
  params: {
    settlementId: string;
  };
}) {
  const survivors = await FetchSurvivors(params.settlementId as string);

  return (
    <div id="population" className="flex flex-1 items-center justify-center">
      <SurvivorTable data={survivors} />
    </div>
  );
}
