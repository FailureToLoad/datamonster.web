"use server";
import { revalidatePath } from "next/cache";
import { AddSettlementSchema } from "./creationDialog";
import { translateFormError } from "@/lib/forms";
import { getUser } from "@workos-inc/authkit-nextjs";

type SettlementCreationRequest = {
  name: string;
};
export const createSettlement = async (settlementName: string) => {
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
    return translateFormError(error);
  }

  revalidatePath("/settlements");
  return "Settlement created";
};
