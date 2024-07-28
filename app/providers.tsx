"use client";

import * as React from "react";
import { NextUIProvider } from "@nextui-org/system";
import { useRouter } from "next/navigation";
import { ThemeProvider as NextThemesProvider } from "next-themes";

export interface ProvidersProps {
  children: React.ReactNode;
  attribute?: string;
  defaultTheme?: string;
}

export function Providers({
  children,
  attribute,
  defaultTheme,
}: ProvidersProps) {
  const router = useRouter();

  return (
    <NextUIProvider navigate={router.push}>
      <NextThemesProvider attribute={attribute} defaultTheme={defaultTheme}>
        {children}
      </NextThemesProvider>
    </NextUIProvider>
  );
}
