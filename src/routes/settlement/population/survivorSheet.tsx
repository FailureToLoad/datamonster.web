import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { NakedInput } from "@/components/ui/nakedInput";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  Form,
  FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Plus } from "lucide-react";
import { useParams } from "react-router-dom";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import Stat from "./stat";
import { GenderMale, GenderFemale } from "@phosphor-icons/react";
import { useAuth } from "@clerk/clerk-react";
import { Survivor } from "@/lib/types/survivor";
import { PopulationQueryKey } from ".";
import { CreateSurvivor } from "@/lib/services/survivor";
import { useQueryClient } from "@tanstack/react-query";
import Tally from "@/components/ui/tally";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

const formSchema = z.object({
  name: z
    .string()
    .min(1, { message: "Name cannot be empty" })
    .max(50, { message: "Name cannot be longer than 50 characters" }),
  gender: z.enum(["M", "F"]),
  huntXp: z.coerce.number().min(0).max(16),
  survival: z.coerce.number().min(0).max(30),
  insanity: z.coerce.number().min(0).max(1000),
  movement: z.coerce.number().min(0).max(15),
  accuracy: z.coerce.number().min(-10).max(15),
  strength: z.coerce.number().min(-10).max(15),
  evasion: z.coerce.number().min(-10).max(15),
  luck: z.coerce.number().min(-10).max(15),
  speed: z.coerce.number().min(-10).max(15),
  lumi: z.coerce.number().min(0).max(50),
  courage: z.coerce.number().min(0).max(9),
  understanding: z.coerce.number().min(0).max(9),
});

export function NewSurvivorDialogue() {
  const { getToken } = useAuth();
  const { settlementId } = useParams();
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "Meat",
      gender: "M",
      huntXp: 0,
      movement: 5,
      accuracy: 0,
      strength: 0,
      evasion: 0,
      luck: 0,
      speed: 0,
    },
  });
  async function onSubmit(values: z.infer<typeof formSchema>) {
    const token = await getToken();
    if (!token || token === "") {
      throw Error("invalid token");
    }

    if (!settlementId || settlementId === "") {
      throw Error("settlementId is required");
    }
    const newbie: Survivor = {
      name: values.name,
      born: 1,
      gender: values.gender,
      status: "alive",
      id: 0,
      settlement: Number(settlementId),
      huntXp: values.huntXp,
      survival: 1,
      movement: values.movement,
      accuracy: values.accuracy,
      strength: values.strength,
      evasion: values.evasion,
      luck: values.luck,
      speed: values.speed,
      insanity: 0,
      systemicPressure: 0,
      torment: 0,
      lumi: 0,
      courage: 0,
      understanding: 0,
    };
    await CreateSurvivor(newbie, settlementId, token);
    queryClient.invalidateQueries({ queryKey: [PopulationQueryKey] });
    setOpen(false);
  }
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" aria-label="launch add survivor dialogue">
          <Plus className="h-6 w-6" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-screen max-w-fit">
        <VisuallyHidden>
          <DialogHeader>
            <DialogTitle>Add Survivor</DialogTitle>
            <DialogDescription>Create a new survivor.</DialogDescription>
          </DialogHeader>
        </VisuallyHidden>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid grid-cols-6 gap-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="border-t-none col-span-5 flex flex-row items-end space-x-3 border-b-2 border-b-slate-300 px-3">
                    <FormLabel>
                      <span className="font-inter text-lg">Name</span>
                    </FormLabel>
                    <FormMessage />
                    <FormControl>
                      <NakedInput type="text" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="gender"
                render={({ field }) => (
                  <FormItem>
                    <FormMessage />
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex h-full w-full flex-row items-end justify-evenly"
                      >
                        <FormItem className="flex flex-col items-center space-x-0 space-y-3">
                          <FormLabel>
                            <GenderFemale size={24} />
                          </FormLabel>
                          <FormControl>
                            <RadioGroupItem value="F" />
                          </FormControl>
                        </FormItem>
                        <FormItem className="flex flex-col items-center space-x-0 space-y-3">
                          <FormLabel>
                            <GenderMale size={24} />
                          </FormLabel>
                          <FormControl>
                            <RadioGroupItem value="M" />
                          </FormControl>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                  </FormItem>
                )}
              />
              <div className="col-span-6">
                <FormField
                  control={form.control}
                  name="huntXp"
                  render={({ field }) => (
                    <FormItem className="flex flex-row space-x-3 px-3">
                      <FormLabel className="min-w-fit self-center">
                        <span className="font-inter text-lg">Hunt XP</span>
                      </FormLabel>
                      <FormControl>
                        <Tally
                          rating={field.value}
                          max={16}
                          onTallyChange={field.onChange}
                          className="w-full"
                          size={30}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="movement"
                render={({ field }) => <Stat field={field} label="MOV" />}
              />
              <FormField
                control={form.control}
                name="accuracy"
                render={({ field }) => <Stat field={field} label="ACC" />}
              />
              <FormField
                control={form.control}
                name="strength"
                render={({ field }) => <Stat field={field} label="STR" />}
              />
              <FormField
                control={form.control}
                name="evasion"
                render={({ field }) => <Stat field={field} label="EVA" />}
              />
              <FormField
                control={form.control}
                name="luck"
                render={({ field }) => <Stat field={field} label="LUCK" />}
              />
              <FormField
                control={form.control}
                name="speed"
                render={({ field }) => <Stat field={field} label="SPD" />}
              />
            </div>
            <DialogFooter>
              <Button type="submit">Add</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
