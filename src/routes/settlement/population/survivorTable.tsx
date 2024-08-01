import { Table, TableHeader, TableColumn, TableBody } from "@nextui-org/react";

export default function SurvivorTable() {
  return (
    <Table isStriped aria-label="Survivor Table">
      <TableHeader>
        <TableColumn>Name</TableColumn>
        <TableColumn>Gender</TableColumn>
        <TableColumn>Status</TableColumn>
        <TableColumn>Hunt Xp</TableColumn>
        <TableColumn>Movement</TableColumn>
        <TableColumn>Accuracy</TableColumn>
        <TableColumn>Strength</TableColumn>
        <TableColumn>Evasion</TableColumn>
        <TableColumn>Luck</TableColumn>
        <TableColumn>Speed</TableColumn>
      </TableHeader>
      <TableBody emptyContent={"No rows to display."}>{[]}</TableBody>
    </Table>
  );
}
