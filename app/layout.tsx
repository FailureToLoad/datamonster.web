import type { Metadata, Viewport } from "next";
import "./global.css";
import { Providers } from "./providers";
import clsx from "clsx";
import { Inter } from "next/font/google";

export const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Datamonster",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={clsx(
          "h-screen bg-background font-sans antialiased",
          inter.variable
        )}
      >
        <Providers attribute="class" defaultTheme="light">
          {children}
        </Providers>
      </body>
    </html>
  );
}
