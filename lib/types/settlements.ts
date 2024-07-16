import { z } from "zod";
export type Settlement = {
  id: string;
  name: string;
  limit: number;
  departing: number;
  cc: number;
  year: number;
};

export const AddSettlementSchema = z.object({
  settlementName: z.string().min(2).max(100),
});

export type AddSettlementFields = z.infer<typeof AddSettlementSchema>;
