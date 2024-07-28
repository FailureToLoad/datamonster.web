"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Dispatch, ReactNode, SetStateAction, useState } from "react";
import { Plus } from "lucide-react";
import { CreateSurvivor } from "@/lib/services/survivor";
import { useParams, usePathname } from "next/navigation";
import { SurvivorSheet } from "@/components/survivors/sheet";
import { Survivor } from "@/lib/types/survivor";

interface DialogueProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  edit: boolean;
}

export function SurvivorDialogue({ open, setOpen }: DialogueProps) {
  const { settlementId } = useParams();
  const pathname = usePathname();
  const submit = (
    <DialogFooter>
      <Button type="submit">Add</Button>
    </DialogFooter>
  );

  const submitAction = async (survivor: Survivor, settlementId: string) => {
    await CreateSurvivor(survivor, settlementId, pathname);
    setOpen(false);
  };

  const defaultValues: Survivor = {
    id: 0,
    name: "Meat",
    gender: "M",
    survival: 0,
    insanity: 0,
    movement: 5,
    accuracy: 0,
    strength: 0,
    evasion: 0,
    luck: 0,
    speed: 0,
    lumi: 0,
    courage: 0,
    understanding: 0,
    settlement: 0,
    born: 1,
    status: "alive",
    huntXp: 0,
    systemicPressure: 0,
    torment: 0,
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" aria-label="launch add survivor dialogue">
          <Plus className="h-6 w-6" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-screen w-full max-w-6xl">
        <SurvivorSheet
          settlementId={settlementId as string}
          submitAction={submitAction}
          submitElement={submit}
          data={defaultValues}
        />
      </DialogContent>
    </Dialog>
  );
}
