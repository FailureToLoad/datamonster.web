"use client";
import React, { useTransition } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Input,
  Button,
} from "@nextui-org/react";

import { Plus } from "lucide-react";
import { z } from "zod";
import { useForm, Controller, useController } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = {
  settlementName: z
    .string()
    .min(1, "Settlement name is too short")
    .max(25, "Settlement name is too long"),
};
export const AddSettlementSchema = z.object(schema);

export type AddSettlementFields = z.infer<typeof AddSettlementSchema>;

export type AddSettlementProps = {
  createSettlement: (settlementName: string) => Promise<void>;
};

export default function AddSettlementModal({
  createSettlement,
}: AddSettlementProps) {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const {
    handleSubmit,
    control,
    formState: { errors, isValid },
  } = useForm<AddSettlementFields>({
    resolver: zodResolver(AddSettlementSchema),
    defaultValues: {
      settlementName: "",
    },
  });
  const [pending, startTransition] = useTransition();
  const submitForm = async (data: AddSettlementFields) => {
    startTransition(async () => {
      const { settlementName } = AddSettlementSchema.parse({
        settlementName: data.settlementName,
      });
      await createSettlement(settlementName);
      onClose();
    });
  };

  const validator = (key: keyof typeof schema) => (value: string) => {
    const res = schema[key].safeParse(value);
    return (!res.success && res.error.issues[0].message) || null;
  };

  return (
    <>
      <Button
        aria-label="Add Settlement"
        color="secondary"
        className="w-full"
        onPress={onOpen}
      >
        <Plus className="h-6 w-6" />
      </Button>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement="top-center"
        data-testid="settlement-modal"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <form onSubmit={handleSubmit(submitForm)}>
                <ModalHeader className="flex flex-col gap-1">
                  Create Settlement
                </ModalHeader>
                <ModalBody data-testid="create-settlement-content">
                  <Controller
                    name="settlementName"
                    rules={{
                      required: true,
                    }}
                    control={control}
                    render={({ field }) => (
                      <Input
                        autoFocus
                        aria-label="Settlement Name"
                        label="Settlement Name"
                        value={field.value}
                        onChange={field.onChange}
                        validate={validator("settlementName")}
                      />
                    )}
                  />
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="flat" onPress={onClose}>
                    Close
                  </Button>
                  <Button color="primary" type="submit" disabled={pending}>
                    Add
                  </Button>
                </ModalFooter>
              </form>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
