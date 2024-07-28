"use server";
import { SurvivorTable } from "@/components/survivors/survivor-table";
import { FetchSurvivors } from "./actions";
import { Suspense } from "react";
import { SurvivorTableSkeleton } from "./skeleton";

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
      <Suspense fallback={<SurvivorTableSkeleton />}>
        <SurvivorTable data={survivors} />
      </Suspense>
    </div>
  );
}
