import { UserButton } from "@clerk/clerk-react";
import { Navbar, NavbarContent, NavbarItem } from "@nextui-org/react";
import { Link, Outlet, useLocation } from "react-router-dom";

function Nav() {
  const { pathname } = useLocation();
  return (
    <Navbar maxWidth="full">
      <NavbarContent className="gap-4 w-full" justify="center">
        <NavbarItem isActive={pathname.includes("timeline")}>
          <Link to="timeline" color="foreground">
            Timeline
          </Link>
        </NavbarItem>
        <NavbarItem isActive={pathname.includes("population")}>
          <Link to="population" color="foreground">
            Population
          </Link>
        </NavbarItem>
        <NavbarItem isActive={pathname.includes("storage")}>
          <Link to="storage" color="foreground">
            Storage
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem>
          <UserButton />
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}

export default function SettlementPage() {
  return (
    <div className="w-screen">
      <Nav />
      <div className="flex h-screen flex-col">
        <div className="p-16">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
