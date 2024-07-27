"use server";
import { revalidatePath } from "next/cache";
import { translateFormError } from "@/lib/forms";
import { getUser } from "@workos-inc/authkit-nextjs";
import { Settlement } from "@/lib/types/settlements";

type SettlementCreationRequest = {
  name: string;
};
export const CreateSettlement = async (settlementName: string) => {
  try {
    const { accessToken } = await getUser();

    const request: SettlementCreationRequest = {
      name: settlementName,
    };
    const response = await fetch(`${process.env.API_HOST}/settlements`, {
      method: "post",
      headers: new Headers({
        Authorization: "Bearer " + accessToken,
        "Content-Type": "application/json",
      }),
      body: JSON.stringify(request),
    });
    if (!response.ok) {
      throw new Error("unable to create settlement");
    }
  } catch (error) {
    throw new Error(translateFormError(error));
  }

  revalidatePath("/settlements");
};

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
