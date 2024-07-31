import { Outlet, useNavigate } from "react-router-dom";
import {
  ClerkLoaded,
  ClerkLoading,
  ClerkProvider,
  SignedIn,
  UserButton,
} from "@clerk/clerk-react";
import { Spinner } from "@nextui-org/react";

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}

export default function RootLayout() {
  const navigate = useNavigate();

  return (
    <ClerkProvider
      routerPush={(to) => navigate(to)}
      routerReplace={(to) => navigate(to, { replace: true })}
      publishableKey={PUBLISHABLE_KEY}
    >
      <ClerkLoading>
        <Spinner />
      </ClerkLoading>
      <ClerkLoaded>
        <SignedIn>
          <header className="header flex flex-row-reverse w-full justify-items-end p-2">
            <UserButton />
          </header>
        </SignedIn>
        <div className="flex h-screen w-screen flex-col items-center justify-center">
          <Outlet />
        </div>
      </ClerkLoaded>
    </ClerkProvider>
  );
}
