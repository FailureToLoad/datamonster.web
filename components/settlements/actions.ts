"use server";
import { revalidatePath } from "next/cache";

import { translateFormError } from "@/lib/forms";
import {
  AddSettlementFields,
  AddSettlementSchema,
  Settlement,
} from "@/lib/types/settlements";

let settlements: Settlement[] = [
  {
    id: crypto.randomUUID(),
    name: "First",
    limit: 0,
    departing: 0,
    cc: 0,
    year: 0,
  },
  {
    id: crypto.randomUUID(),
    name: "Second",
    limit: 0,
    departing: 0,
    cc: 0,
    year: 0,
  },
  {
    id: crypto.randomUUID(),
    name: "Third",
    limit: 0,
    departing: 0,
    cc: 0,
    year: 0,
  },
];

export const getSettlements = async (): Promise<Settlement[]> => {
  await new Promise((resolve) => setTimeout(resolve, 250));

  return Promise.resolve(settlements);
};

export const createSettlement = async (data: AddSettlementFields) => {
  try {
    await new Promise((resolve) => setTimeout(resolve, 250));

    const { settlementName } = AddSettlementSchema.parse({
      settlementName: data.settlementName,
    });

    settlements.push({
      id: crypto.randomUUID(),
      name: settlementName,
      limit: 0,
      departing: 0,
      cc: 0,
      year: 0,
    });
  } catch (error) {
    return translateFormError(error);
  }

  revalidatePath("/");
  return "Settlement created";
};
