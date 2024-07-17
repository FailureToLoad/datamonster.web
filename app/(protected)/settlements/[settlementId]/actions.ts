"use server";

import { Settlement } from "@/lib/types/settlements";
import { getUser } from "@workos-inc/authkit-nextjs";

export async function GetSettlement(settlementId: string) {
  const { accessToken } = await getUser();
  const response = await fetch(
    `${process.env.API_HOST}/settlements/${settlementId}`,
    {
      method: "get",
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      }),
    }
  );

  if (!response.ok) {
    throw new Error("unable to fetch settlement");
  }

  const responseJson: Settlement = await response.json();
  return responseJson;
}
