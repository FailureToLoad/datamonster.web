import { getSignInUrl } from "@workos-inc/authkit-nextjs";
import Link from "next/link";

export default async function Home() {
  const signInHref = await getSignInUrl();
  return (
    <main className="flex h-screen flex-col items-center justify-center">
      <h1 className="mb-4 text-5xl font-extrabold leading-none tracking-tight ">
        Datamonster
      </h1>
      <Link href={signInHref}>Sign In</Link>
    </main>
  );
}
