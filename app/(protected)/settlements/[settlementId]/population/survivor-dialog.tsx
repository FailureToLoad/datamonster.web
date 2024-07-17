"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import Stat from "./stat";
import { GenderMale, GenderFemale } from "@phosphor-icons/react";
import { Survivor } from "./types";
import { CreateSurvivor } from "./actions";
import { useParams } from "next/navigation";
import Tally from "@/components/ui/tally";

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

export function SurvivorDialogue() {
  const { settlementId } = useParams();
  const [open, setOpen] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
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
    },
  });
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const newbie: Survivor = {
        name: values.name,
        born: 1,
        gender: values.gender,
        status: "alive",
        id: 0,
        settlement: 0,
        huntXp: values.huntXp,
        survival: values.survival,
        movement: values.movement,
        accuracy: values.accuracy,
        strength: values.strength,
        evasion: values.evasion,
        luck: values.luck,
        speed: values.speed,
        insanity: values.insanity,
        systemicPressure: 0,
        torment: 0,
        lumi: 0,
        courage: values.courage,
        understanding: values.understanding,
      };
      await CreateSurvivor(newbie, settlementId as string);
      setOpen(false);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" aria-label="launch add survivor dialogue">
          <Plus className="h-6 w-6" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-screen w-full max-w-6xl">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="h-full space-y-10">
              <div className="flex w-full flex-col space-x-4 space-y-5">
                <div className="flex w-full flex-row space-x-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem className="border-t-none flex w-5/6 flex-row items-end space-x-3 border-b-2 border-b-slate-300 px-3">
                        <FormLabel>
                          <span className="text-xl">Name</span>
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
                      <FormItem className="w-1/6">
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
                </div>
                <div className="flex w-full flex-row justify-evenly space-x-4">
                  <FormField
                    control={form.control}
                    name="huntXp"
                    render={({ field }) => (
                      <FormItem className="flex w-full flex-row items-center space-x-4">
                        <FormLabel>
                          <span className="text-lg">Hunt XP</span>
                        </FormLabel>
                        <FormControl>
                          <Tally
                            value={field.value}
                            onChange={field.onChange}
                            count={16}
                            color="text-slate-100"
                            activeColor="text-black"
                            hoverColor="text-slate-300"
                            size={40}
                            edit={field.disabled}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              <div className="flex w-full flex-row justify-evenly space-x-4">
                <FormField
                  control={form.control}
                  name="survival"
                  render={({ field }) => (
                    <Stat field={field} label="Survival" />
                  )}
                />
                <FormField
                  control={form.control}
                  name="insanity"
                  render={({ field }) => (
                    <Stat field={field} label="Insanity" />
                  )}
                />
              </div>
              <div className="flex w-full flex-row justify-evenly space-x-4">
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
                <FormField
                  control={form.control}
                  name="lumi"
                  render={({ field }) => <Stat field={field} label="LUMI" />}
                />
              </div>
              <div className="flex w-full flex-row justify-around">
                <FormField
                  control={form.control}
                  name="courage"
                  render={({ field }) => (
                    <FormItem className="flex flex-col items-center">
                      <FormControl>
                        <Tally
                          value={field.value}
                          onChange={field.onChange}
                          count={9}
                          color="text-slate-100"
                          activeColor="text-black"
                          hoverColor="text-slate-300"
                          size={40}
                          edit={field.disabled}
                        />
                      </FormControl>
                      <FormLabel>
                        <span className="text-lg">Courage</span>
                      </FormLabel>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="understanding"
                  render={({ field }) => (
                    <FormItem className="flex flex-col items-center">
                      <FormControl>
                        <Tally
                          value={field.value}
                          onChange={field.onChange}
                          count={9}
                          color="text-slate-100"
                          activeColor="text-black"
                          hoverColor="text-slate-300"
                          size={40}
                          edit={field.disabled}
                        />
                      </FormControl>
                      <FormLabel>
                        <span className="text-lg">Understanding</span>
                      </FormLabel>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
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
