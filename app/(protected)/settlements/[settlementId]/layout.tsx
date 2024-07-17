import { Settlement } from "@/lib/types/settlements";
import Link from "next/link";
import { navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import { GetSettlement } from "./actions";

interface HeaderProps {
  settlement: Settlement;
}
function Header({ settlement }: HeaderProps) {
  return (
    <div id="header" className="sticky top-0 w-full flex-none">
      <div className="m-2 flex h-20 justify-center">
        <div className="flex w-1/3 flex-col">
          <div className="flex w-full">
            <div className="inline-flex grow justify-center">
              {settlement?.name}
            </div>
          </div>
          <div className="inline-flex justify-center">
            <Link href="timeline/" className={navigationMenuTriggerStyle()}>
              Timeline
            </Link>
            <Link href="population/" className={navigationMenuTriggerStyle()}>
              Population
            </Link>
            <Link href="storage/" className={navigationMenuTriggerStyle()}>
              Storage
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default async function SettlementLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: {
    settlementId: string;
  };
}) {
  const settlement = await GetSettlement(params.settlementId);
  return (
    <div className="flex h-screen w-full flex-col">
      <Header settlement={settlement} />
      <div className="p-16">{children}</div>
    </div>
  );
}
