"use client";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  Form,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createSettlement } from "./actions";

import { useState, useTransition } from "react";
import { z } from "zod";

export const AddSettlementSchema = z.object({
  settlementName: z.string().min(2).max(100),
});

export type AddSettlementFields = z.infer<typeof AddSettlementSchema>;

export function CreateSettlementDialogue() {
  const [open, setOpen] = useState(false);
  const [pending, startTransition] = useTransition();
  const onSettlementFormSubmit = async (data: AddSettlementFields) => {
    startTransition(async () => {
      const { settlementName } = AddSettlementSchema.parse({
        settlementName: data.settlementName,
      });
      await createSettlement(settlementName);
    });
    setOpen(false);
  };
  const form = useForm<AddSettlementFields>({
    resolver: zodResolver(AddSettlementSchema),
    defaultValues: {
      settlementName: "",
    },
  });
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="w-full"
          aria-label="launch add settlement dialogue"
        >
          <Plus className="h-6 w-6" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <Form {...form}>
          <form
            className="space-y-8"
            onSubmit={form.handleSubmit(onSettlementFormSubmit)}
          >
            <DialogHeader>
              <DialogTitle>Add Settlement</DialogTitle>
              <DialogDescription>Enter settlement details.</DialogDescription>
            </DialogHeader>

            <FormField
              control={form.control}
              name="settlementName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Settlement Name</FormLabel>
                  <FormControl>
                    <Input type="text" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button disabled={pending} type="submit">
                Add
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
