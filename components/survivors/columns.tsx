import { ColumnDef } from "@tanstack/react-table";
import { ArrowDown, ArrowUp } from "lucide-react";
import { Button } from "@/components/ui/button";

export enum Keys {
  born = "born",
  gender = "gender",
  status = "status",
  name = "name",
  xp = "huntXp",
  survival = "survival",
  movement = "movement",
  accuracy = "accuracy",
  strength = "strength",
  evasion = "evasion",
  luck = "luck",
  speed = "speed",
  insanity = "insanity",
  sp = "systemicPressure",
  torment = "torment",
  lumi = "lumi",
  courage = "courage",
  understanding = "understanding",
}

export const DefaultColumns = {
  born: false,
  gender: true,
  status: true,
  name: true,
  huntXp: true,
  survival: true,
  insanity: true,
  movement: true,
  accuracy: true,
  strength: true,
  evasion: true,
  luck: true,
  speed: true,
  systemicPressure: false,
  torment: false,
  lumi: false,
  courage: false,
  understanding: false,
};

export function getColumns<Type>(): ColumnDef<Type>[] {
  const columns: ColumnDef<Type>[] = [
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
      accessorKey: Keys.insanity,
      header: "Insanity",
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
  return columns;
}
