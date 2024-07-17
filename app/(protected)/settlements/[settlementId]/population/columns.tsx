import { ColumnDef } from "@tanstack/react-table";
import { ArrowDown, ArrowUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Keys, Survivor } from "./types";

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
    accessorKey: Keys.born,
    header: "Born",
  },
  {
    accessorKey: Keys.gender,
    header: "Gender",
  },
  {
    accessorKey: Keys.status,
    header: "Status",
  },
  {
    accessorKey: Keys.xp,
    header: "XP",
  },
  {
    accessorKey: Keys.survival,
    header: "Survival",
  },
  {
    accessorKey: Keys.movement,
    header: "Movement",
  },
  {
    accessorKey: Keys.accuracy,
    header: "Accuracy",
  },
  {
    accessorKey: Keys.strength,
    header: "Strength",
  },
  {
    accessorKey: Keys.evasion,
    header: "Evasion",
  },
  {
    accessorKey: Keys.luck,
    header: "Luck",
  },
  {
    accessorKey: Keys.speed,
    header: "Speed",
  },
  {
    accessorKey: Keys.insanity,
    header: "Insanity",
  },
  {
    accessorKey: Keys.sp,
    header: "Systemic Pressure",
  },
  {
    accessorKey: Keys.torment,
    header: "Torment",
  },
  {
    accessorKey: Keys.lumi,
    header: "Lumi",
  },
  {
    accessorKey: Keys.courage,
    header: "Courage",
  },
  {
    accessorKey: Keys.understanding,
    header: "Understanding",
  },
];
