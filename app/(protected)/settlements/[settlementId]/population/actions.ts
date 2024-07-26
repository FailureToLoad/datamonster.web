"use server";
import { getUser } from "@workos-inc/authkit-nextjs";
import { Survivor } from "@/lib/types/survivor";
import { revalidatePath } from "next/cache";

export async function FetchSurvivors(settlementId: string) {
  const { accessToken } = await getUser();
  const path = `${process.env.API_HOST}/settlements/${settlementId}/survivors`;
  console.log(`request path ${path}`);
  const response = await fetch(path, {
    method: "get",
    headers: new Headers({
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    }),
  });

  if (!response.ok) {
    throw new Error("unable to fetch survivors");
  }

  const responseJson: Array<Survivor> = await response.json();
  return responseJson;
}

export async function CreateSurvivor(survivor: Survivor, settlementId: string) {
  const { accessToken } = await getUser();
  const path = `${process.env.API_HOST}/settlements/${settlementId}/survivors`;
  const response = await fetch(path, {
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
  revalidatePath(`/settlements/${settlementId}/population`);
}
