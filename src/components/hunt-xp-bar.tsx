import Tally from "./tally";

interface HuntXPBarProps {
  value: number;
  updateValue: (newValue: number) => void;
}
export default function HuntXPBar({ value, updateValue }: HuntXPBarProps) {
  const marks = [
    { pos: 2, val: "Age 1" },
    { pos: 6, val: "Age 2" },
    { pos: 10, val: "Age 3" },
    { pos: 15, val: "Age 4" },
    { pos: 16, val: "Retired" },
  ];
  return (
    <Tally value={value} count={16} marks={marks} updateValue={updateValue} />
  );
}
