import { Play } from "lucide-react";
import Link from "next/link";
import { Settlement } from "@/lib/types/settlements";
import { Card, CardHeader, CardBody, Button } from "@nextui-org/react";

export function SettlementCard({ settlement }: { settlement: Settlement }) {
  const link = "/settlements/" + settlement.id;
  return (
    <Card>
      <CardHeader aria-label={settlement.name}>
        <div className="flex flex-col">
          <p className="text-md">{settlement.name}</p>
        </div>
      </CardHeader>
      <CardBody>
        <div className="flex flex-row justify-between">
          <div>Lantern Year: {settlement.year}</div>
          <div>
            <Link href={link}>
              <Button variant="ghost" size="sm">
                <Play className="h-6 w-6" />
              </Button>
            </Link>
          </div>
        </div>
      </CardBody>
    </Card>
  );
}
