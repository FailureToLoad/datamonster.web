import { getUser } from "@workos-inc/authkit-nextjs";
import { Survivor } from "./types";

export async function FetchSurvivors(settlementId: string, token: string) {
  const response = await fetch(
    `${process.env.API_HOST}/settlement/${settlementId}/survivor`,
    {
      method: "get",
      headers: new Headers({
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      }),
    }
  );

  if (!response.ok) {
    throw new Error("unable to fetch survivors");
  }

  const responseJson: Array<Survivor> = await response.json();
  return responseJson;
}

export async function CreateSurvivor(survivor: Survivor, settlementId: string) {
  const { accessToken } = await getUser();
  const path = `${process.env.API_HOST}/settlement/${settlementId}/survivor`;
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
}
