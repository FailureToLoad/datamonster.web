import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { getUser, signOut } from "@workos-inc/authkit-nextjs";
import { Label } from "./ui/label";

export async function UserHeader() {
  const { user } = await getUser({ ensureSignedIn: true });

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative rounded-full">
          {user.email}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <form
          action={async () => {
            "use server";
            await signOut();
          }}
        >
          <input type="submit" id="submit-form" className="hidden" />
          <DropdownMenuItem asChild>
            <Label htmlFor="submit-form">Log out</Label>
          </DropdownMenuItem>
        </form>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
