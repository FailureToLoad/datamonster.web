import { Outlet, useNavigate } from "react-router-dom";
import { ClerkLoaded, ClerkLoading, ClerkProvider } from "@clerk/clerk-react";
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
      <div className="flex h-screen flex-col items-center justify-center">
        <ClerkLoading>
          <Spinner />
        </ClerkLoading>
        <ClerkLoaded>
          <Outlet />
        </ClerkLoaded>
      </div>
    </ClerkProvider>
  );
}
