import { Table, TableHeader, TableColumn, TableBody } from "@nextui-org/react";

export default function PopulationTable() {
  return (
    <Table isStriped aria-label="Survivor Table">
      <TableHeader>
        <TableColumn>Name</TableColumn>
        <TableColumn>Status</TableColumn>
        <TableColumn>Hunt Xp</TableColumn>
      </TableHeader>
      <TableBody emptyContent={"No rows to display."}>{[]}</TableBody>
    </Table>
  );
}
