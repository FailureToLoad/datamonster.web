export type Survivor = {
  id: number;
  settlement: number;
  name: string;
  born: number;
  gender: string;
  status: "alive" | "dead" | "retired";
  huntXp: number;
  survival: number;
  movement: number;
  accuracy: number;
  strength: number;
  evasion: number;
  luck: number;
  speed: number;
  insanity: number;
  systemicPressure: number;
  torment: number;
  lumi: number;
  courage: number;
  understanding: number;
};

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
