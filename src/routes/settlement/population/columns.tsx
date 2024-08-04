import { ColumnDef } from "@tanstack/react-table";
import { ArrowDown, ArrowUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Keys } from "./types";
import { Survivor } from "@/lib/types/survivor";

export const columns: ColumnDef<Survivor>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => {
      const isAsc = column.getIsSorted() === "asc";
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(isAsc)}>
          Name
          {isAsc ? (
            <ArrowDown className="ml-2 h-4 w-4" />
          ) : (
            <ArrowUp className="ml-2 h-4 w-4" />
          )}
        </Button>
      );
    },
  },
  {
    id: Keys.born,
    accessorKey: Keys.born,
    header: "Born",
  },
  {
    id: Keys.gender,
    accessorKey: Keys.gender,
    header: "Gender",
  },
  {
    id: Keys.status,
    accessorKey: Keys.status,
    header: "Status",
  },
  {
    id: Keys.xp,
    accessorKey: Keys.xp,
    header: "XP",
  },
  {
    id: Keys.survival,
    accessorKey: Keys.survival,
    header: "Survival",
  },
  {
    id: Keys.movement,
    accessorKey: Keys.movement,
    header: "Movement",
  },
  {
    id: Keys.accuracy,
    accessorKey: Keys.accuracy,
    header: "Accuracy",
  },
  {
    id: Keys.strength,
    accessorKey: Keys.strength,
    header: "Strength",
  },
  {
    id: Keys.evasion,
    accessorKey: Keys.evasion,
    header: "Evasion",
  },
  {
    id: Keys.luck,
    accessorKey: Keys.luck,
    header: "Luck",
  },
  {
    id: Keys.speed,
    accessorKey: Keys.speed,
    header: "Speed",
  },
  {
    id: Keys.insanity,
    accessorKey: Keys.insanity,
    header: "Insanity",
  },
  {
    id: Keys.sp,
    accessorKey: Keys.sp,
    header: "Systemic Pressure",
  },
  {
    id: Keys.torment,
    accessorKey: Keys.torment,
    header: "Torment",
  },
  {
    id: Keys.lumi,
    accessorKey: Keys.lumi,
    header: "Lumi",
  },
  {
    id: Keys.courage,
    accessorKey: Keys.courage,
    header: "Courage",
  },
  {
    id: Keys.understanding,
    accessorKey: Keys.understanding,
    header: "Understanding",
  },
];
