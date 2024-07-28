import {
  FormItem,
  FormControl,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { NakedInput } from "@/components/ui/nakedInput";
import { ControllerRenderProps, FieldPath, FieldValues } from "react-hook-form";

type StatProps<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>
> = {
  field: ControllerRenderProps<TFieldValues, TName>;
  label: string;
};

const Stat = <
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>
>({
  field,
  label,
}: StatProps<TFieldValues, TName>) => (
  <FormItem className="flex w-32 flex-col items-center">
    <FormControl>
      <NakedInput
        type="number"
        {...field}
        className="h-20 rounded-lg border-2 border-slate-300 px-0 py-3 text-xl"
      />
    </FormControl>
    <FormLabel>
      <span className="text-lg">{label}</span>
    </FormLabel>
    <FormMessage />
  </FormItem>
);

export default Stat;
