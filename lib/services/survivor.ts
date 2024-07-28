"use server";
import { Survivor } from "@/lib/types/survivor";
import { getUser } from "@workos-inc/authkit-nextjs";
import { revalidatePath } from "next/cache";

export async function CreateSurvivor(
  survivor: Survivor,
  settlementId: string,
  path: string
) {
  const { accessToken } = await getUser();
  const req = `${process.env.API_HOST}/settlements/${settlementId}/survivors`;
  const response = await fetch(req, {
    method: "post",
    headers: new Headers({
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    }),
    body: JSON.stringify(survivor),
  });

  if (!response.ok) {
    throw new Error("survivor creation failed");
  }
  revalidatePath(path);
}
