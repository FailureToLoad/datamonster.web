import { UserHeader } from "@/components/user-header";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className="flex flex-row w-full justify-end">
        <UserHeader />
      </div>
      {children}
    </>
  );
}
