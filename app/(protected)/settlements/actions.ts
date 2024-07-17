"use server";
import { Settlement } from "@/lib/types/settlements";
import { getUser } from "@workos-inc/authkit-nextjs";

export async function GetSettlements(): Promise<Settlement[]> {
  const { accessToken } = await getUser();

  let response = await fetch(`${process.env.API_HOST}/settlements`, {
    method: "get",
    headers: new Headers({
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    }),
  });

  if (!response.ok) {
    throw new Error("unable to fetch settlements for user");
  }

  const responseJson: Array<Settlement> = await response.json();
  return responseJson;
}
