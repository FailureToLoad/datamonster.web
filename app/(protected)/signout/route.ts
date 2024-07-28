"use server";

import { signOut } from "@workos-inc/authkit-nextjs";
import { redirect } from "next/navigation";

export async function GET() {
  await signOut();
  redirect("/");
}
