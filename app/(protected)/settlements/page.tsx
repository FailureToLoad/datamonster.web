import { CreateSettlementDialogue } from "@/components/settlements/creationDialog";
import { GetSettlements } from "./actions";
import { Settlement } from "@/lib/types/settlements";
import { SettlementCard } from "@/components/settlements/card";

async function SettlementSelector() {
  const settlements: Array<Settlement> = await GetSettlements();

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden w-full">
      <ul className="w-1/4 space-y-4 ">
        {settlements &&
          settlements.map((settlement) => (
            <li key={settlement.id}>
              <SettlementCard settlement={settlement} />
            </li>
          ))}
        <li key={-1}>
          <CreateSettlementDialogue />
        </li>
      </ul>
    </div>
  );
}

export default function Settlements() {
  return (
    <main className="flex h-screen flex-col items-center justify-center">
      <SettlementSelector />
    </main>
  );
}
