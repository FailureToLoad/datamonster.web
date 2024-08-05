import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Input,
  Button,
  RadioGroup,
  Radio,
  Slider,
} from "@nextui-org/react";

import { z } from "zod";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "@clerk/clerk-react";
import { useQueryClient } from "@tanstack/react-query";
import { CreateSurvivor } from "@/lib/services/survivor";
import { PopulationQueryKey } from "./survivorTable";
import { Survivor } from "@/lib/types/survivor";
import { useParams } from "react-router-dom";
import { GenderFemale, GenderMale, Plus } from "@phosphor-icons/react";

const schema = {
  name: z
    .string()
    .min(1, { message: "Name is too short" })
    .max(50, { message: "Name is too long" }),
  gender: z.enum(["M", "F"]),
  huntXp: z.coerce.number().min(0).max(16),
  movement: z.coerce.number().min(0).max(15),
  accuracy: z.coerce.number().min(-10).max(15),
  strength: z.coerce.number().min(-10).max(15),
  evasion: z.coerce.number().min(-10).max(15),
  luck: z.coerce.number().min(-10).max(15),
  speed: z.coerce.number().min(-10).max(15),
};
export const NewSurvivorSchema = z.object(schema);

export type NewSurvivorFields = z.infer<typeof NewSurvivorSchema>;

export default function NewSurvivorModal() {
  const { getToken } = useAuth();
  const { settlementId } = useParams();
  const queryClient = useQueryClient();
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const { handleSubmit, control } = useForm<NewSurvivorFields>({
    resolver: zodResolver(NewSurvivorSchema),
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
  const submitForm = async (values: NewSurvivorFields) => {
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
    onClose();
  };

  const validator = (key: keyof typeof schema) => (value: string) => {
    const res = schema[key].safeParse(value);
    return (!res.success && res.error.issues[0].message) || null;
  };

  return (
    <>
      <Button
        isIconOnly
        aria-label="Add Settlement"
        color="primary"
        onPress={onOpen}
      >
        <Plus className="size-4" />
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
                  Add Survivor
                </ModalHeader>
                <ModalBody data-testid="create-settlement-content">
                  <div className="grid grid-cols-6 gap-4">
                    <Controller
                      name="name"
                      rules={{
                        required: true,
                      }}
                      control={control}
                      render={({ field }) => (
                        <Input
                          autoFocus
                          className="col-span-5"
                          aria-label="Survivor Name"
                          label="Survivor Name"
                          value={field.value}
                          onChange={field.onChange}
                          validate={validator("name")}
                        />
                      )}
                    />
                    <Controller
                      name="gender"
                      control={control}
                      render={({ field }) => (
                        <RadioGroup
                          value={field.value}
                          onValueChange={field.onChange}
                          className="flex flex-row"
                        >
                          <Radio value="M">
                            <GenderMale />
                          </Radio>
                          <Radio value="F">
                            <GenderFemale />
                          </Radio>
                        </RadioGroup>
                      )}
                    />
                    <Controller
                      name="huntXp"
                      rules={{
                        required: true,
                      }}
                      control={control}
                      render={({ field }) => (
                        <Slider
                          aria-label="Hunt Experience"
                          label="Hunt XP"
                          value={field.value}
                          onChange={field.onChange}
                          size="md"
                          step={1}
                          color="foreground"
                          showSteps={true}
                          maxValue={16}
                          minValue={0}
                          defaultValue={0}
                          className="max-w-md col-span-6"
                          marks={[
                            {
                              value: 2,
                              label: "Age I",
                            },
                            {
                              value: 6,
                              label: "Age II",
                            },
                            {
                              value: 10,
                              label: "Age III",
                            },
                            {
                              value: 16,
                              label: "Retired",
                            },
                          ]}
                        />
                      )}
                    />
                    <Controller
                      name="movement"
                      rules={{
                        required: true,
                      }}
                      control={control}
                      render={({ field }) => (
                        <Input
                          autoFocus
                          aria-label="Movement"
                          label="MOV"
                          value={"" + field.value}
                          onChange={field.onChange}
                          validate={validator("movement")}
                        />
                      )}
                    />
                    <Controller
                      name="accuracy"
                      rules={{
                        required: true,
                      }}
                      control={control}
                      render={({ field }) => (
                        <Input
                          autoFocus
                          aria-label="Accuracy"
                          label="ACC"
                          value={"" + field.value}
                          onChange={field.onChange}
                          validate={validator("accuracy")}
                        />
                      )}
                    />
                    <Controller
                      name="strength"
                      rules={{
                        required: true,
                      }}
                      control={control}
                      render={({ field }) => (
                        <Input
                          autoFocus
                          aria-label="Strength"
                          label="STR"
                          value={"" + field.value}
                          onChange={field.onChange}
                          validate={validator("strength")}
                        />
                      )}
                    />
                    <Controller
                      name="evasion"
                      rules={{
                        required: true,
                      }}
                      control={control}
                      render={({ field }) => (
                        <Input
                          autoFocus
                          aria-label="Evasion"
                          label="EVA"
                          value={"" + field.value}
                          onChange={field.onChange}
                          validate={validator("evasion")}
                        />
                      )}
                    />
                    <Controller
                      name="luck"
                      rules={{
                        required: true,
                      }}
                      control={control}
                      render={({ field }) => (
                        <Input
                          autoFocus
                          aria-label="Luck"
                          label="LUCK"
                          value={"" + field.value}
                          onChange={field.onChange}
                          validate={validator("luck")}
                        />
                      )}
                    />
                    <Controller
                      name="speed"
                      rules={{
                        required: true,
                      }}
                      control={control}
                      render={({ field }) => (
                        <Input
                          autoFocus
                          aria-label="Speed"
                          label="SPD"
                          value={"" + field.value}
                          onChange={field.onChange}
                          validate={validator("speed")}
                        />
                      )}
                    />
                  </div>
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="flat" onPress={onClose}>
                    Close
                  </Button>
                  <Button className="bg-primary" type="submit">
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
