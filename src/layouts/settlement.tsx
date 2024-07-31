import { UserButton, useUser } from "@clerk/clerk-react";
import { Navbar, NavbarContent, NavbarItem, Spinner } from "@nextui-org/react";
import { Link, Outlet } from "react-router-dom";

function Nav() {
  return (
    <Navbar maxWidth="full">
      <NavbarContent className="hidden sm:flex gap-4 w-screen" justify="center">
        <NavbarItem>
          <Link to="timeline/" color="foreground">
            Timeline
          </Link>
        </NavbarItem>
        <NavbarItem isActive>
          <Link to="population/" color="foreground">
            Population
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link to="storage/" color="foreground">
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

export default function SettlementLayout() {
  const { isLoaded } = useUser();
  if (!isLoaded) {
    return <Spinner />;
  }

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
