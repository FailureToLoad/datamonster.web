import Link from "next/link";
import { Navbar, NavbarContent, NavbarItem } from "@nextui-org/react";
import UserDropdown from "@/components/user-dropdown";
import { getUser } from "@workos-inc/authkit-nextjs";

async function Nav() {
  const { user } = await getUser();
  return (
    <Navbar maxWidth="full">
      <NavbarContent className="hidden sm:flex gap-4 w-screen" justify="center">
        <NavbarItem>
          <Link href="timeline/" color="foreground">
            Timeline
          </Link>
        </NavbarItem>
        <NavbarItem isActive>
          <Link href="population/" color="foreground">
            Population
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link href="storage/" color="foreground">
            Storage
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem>
          <UserDropdown email={user!.email} />
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}

export default async function SettlementLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <Nav />
      <div className="flex h-screen w-full flex-col">
        <div className="p-16">{children}</div>
      </div>
    </div>
  );
}
<Nav />;
