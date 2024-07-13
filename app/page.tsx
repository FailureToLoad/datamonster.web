import { HomePage } from "@/components/home";
import { redirect } from "next/navigation";

export default async function Home() {
  return (
    <main className="flex h-screen flex-col items-center justify-center ">
      <HomePage />
    </main>
  );
}
