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
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFormStatus } from "react-dom";
import { createSettlement } from "./actions";
import { useState } from "react";

const addSettlementSchema = z.object({
  settlementName: z.string().min(2).max(100),
});

export type AddSettlementFields = z.infer<typeof addSettlementSchema>;

type SubmitButtonProps = {
  label: string;
  loading: React.ReactNode;
};

const SubmitButton = ({ label, loading }: SubmitButtonProps) => {
  const { pending } = useFormStatus();

  return (
    <Button disabled={pending} type="submit">
      {pending ? loading : label}
    </Button>
  );
};

export default function CreateSettlementDialogue() {
  const [open, setOpen] = useState(false);
  const onSettlementFormSubmit = async (data: AddSettlementFields) => {
    await createSettlement(data);
    setOpen(false);
  };
  const form = useForm<AddSettlementFields>({
    resolver: zodResolver(addSettlementSchema),
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
            onSubmit={form.handleSubmit((data) => onSettlementFormSubmit(data))}
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
              <SubmitButton label="Create" loading="Creating ..." />
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
