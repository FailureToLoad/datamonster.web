import { Navbar, NavbarContent, NavbarItem } from "@nextui-org/react";
import { Link, Outlet, useLocation } from "react-router-dom";

function Nav() {
  const { pathname } = useLocation();
  return (
    <Navbar maxWidth="full">
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
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
    </Navbar>
  );
}

export default function SettlementLayout() {
  return (
    <div>
      <Nav />
      <div className="flex h-screen w-full flex-col">
        <div className="p-16">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
