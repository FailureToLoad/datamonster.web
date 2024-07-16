"use server";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { AddSettlementFields } from "./index";
import { translateFormError } from "@/lib/forms";
const addSettlementSchema = z.object({
  settlementName: z.string().min(2).max(100),
});

export type Settlement = {
  id: string;
  name: string;
  limit: number;
  departing: number;
  cc: number;
  year: number;
};

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

    const { settlementName } = addSettlementSchema.parse({
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
