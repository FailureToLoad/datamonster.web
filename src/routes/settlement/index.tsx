import { navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import { UserButton } from "@clerk/clerk-react";
import { Link, Outlet } from "react-router-dom";

function Header() {
  return (
    <div id="header" className="sticky top-0 w-full flex-none">
      <div className="m-2 flex h-20 justify-center">
        <div className="flex w-1/3 flex-row">
          <div className="inline-flex items-center justify-center">
            <Link to="timeline/" className={navigationMenuTriggerStyle()}>
              Timeline
            </Link>
            <Link to="population/" className={navigationMenuTriggerStyle()}>
              Population
            </Link>
            <Link to="storage/" className={navigationMenuTriggerStyle()}>
              Storage
            </Link>
          </div>
          <div className="flex place-content-end justify-end">
            <UserButton />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function SettlementPage() {
  return (
    <div>
      <Header />
      <div className="flex h-screen flex-col">
        <div className="p-16 flex flex-1 justify-center">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
