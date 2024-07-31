import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { NextUIProvider } from "@nextui-org/react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "@/layouts/root.tsx";

import IndexPage from "@/routes";
import SignInPage from "@/routes/signin";
import SignUpPage from "@/routes/signup";
import ProtectedLayout from "@/layouts/protected.tsx";
import SettlementsPage from "@/routes/settlementList.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import SettlementLayout from "@/layouts/settlement.tsx";
import StorageTab from "@/routes/settlement/settlementStorage.tsx";
import TimelineTab from "./routes/settlement/timeline.tsx";
import PopulationTab from "./routes/settlement/population.tsx";

const queryClient = new QueryClient();

// Import your publishable key
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      { path: "/", element: <IndexPage /> },
      { path: "/signin/*", element: <SignInPage /> },
      { path: "/signup/*", element: <SignUpPage /> },
      {
        element: <ProtectedLayout />,
        children: [
          { path: "/settlements", element: <SettlementsPage /> },
          {
            path: "/settlements/:settlementId",
            element: <SettlementLayout />,
            children: [
              { path: "population", element: <PopulationTab /> },
              { path: "storage", element: <StorageTab /> },
              { path: "timeline", element: <TimelineTab /> },
            ],
          },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <NextUIProvider>
        <RouterProvider router={router} />
      </NextUIProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
