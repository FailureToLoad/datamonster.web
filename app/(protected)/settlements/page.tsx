"use server";
import AddSettlementModal from "@/components/settlements/creationModal";
import { GetSettlements } from "./actions";
import { Settlement } from "@/lib/types/settlements";
import { SettlementCard } from "@/components/settlements/card";

export default async function SettlementsPage() {
  const settlements: Array<Settlement> = await GetSettlements();
  return (
    <main className="flex w-screen h-screen flex-col items-center justify-center overflow-hidden">
      <ul className="w-1/4 space-y-4 ">
        {settlements &&
          settlements.map((settlement) => (
            <li key={settlement.id}>
              <SettlementCard settlement={settlement} />
            </li>
          ))}
        <li key={-1}>
          <AddSettlementModal />
        </li>
      </ul>
    </main>
  );
}
