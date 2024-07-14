import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Play } from "lucide-react";

import Link from "next/link";
import { CreateSettlementDialogue } from "@/app/createSettlementDialog";

export type Settlement = {
  id: string;
  name: string;
  limit: number;
  departing: number;
  cc: number;
  year: number;
};

function SettlementCard({ settlement }: { settlement: Settlement }) {
  const link = "/" + settlement.id;
  return (
    <Card>
      <CardHeader>
        <CardTitle>{settlement.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-row justify-between">
          <div>Lantern Year: {settlement.year}</div>
          <div>
            <Link href={link}>
              <Button variant="ghost" size="icon">
                <Play className="h-6 w-6" />
              </Button>
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function SettlementSelector() {
  const settlements: Array<Settlement> = [];

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden">
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

export default SettlementSelector;
