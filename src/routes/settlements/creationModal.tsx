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
import { Input } from "@/components/ui/input";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  Form,
} from "@/components/ui/form";

import { Plus } from "lucide-react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "@clerk/clerk-react";
import { useQueryClient } from "@tanstack/react-query";
import { SettlementsQueryKey } from ".";
import { useState } from "react";

const formSchema = z.object({
  settlementName: z.string().min(2).max(100),
});

export type AddSettlementProps = {
  createSettlement: (
    settlementName: string,
    accessToken: string
  ) => Promise<void>;
};

export default function AddSettlementModal({
  createSettlement,
}: AddSettlementProps) {
  const [open, setOpen] = useState(false);
  const { getToken } = useAuth();
  const queryClient = useQueryClient();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      settlementName: "",
    },
  });
  const submitForm = async (values: z.infer<typeof formSchema>) => {
    try {
      const token = await getToken();
      if (token === null || token === "") {
        throw Error("invalid token");
      }
      const settlementName = values.settlementName;
      await createSettlement(settlementName, token);
      queryClient.invalidateQueries({ queryKey: [SettlementsQueryKey] });
      setOpen(false);
    } catch (error) {
      console.log(error);
    }
  };

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
          <form className="space-y-8" onSubmit={form.handleSubmit(submitForm)}>
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
              <Button type="submit">Add</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
