import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  getKeyValue,
} from "@nextui-org/react";
import Spinner from "@/components/spinner";
import NewSurvivorModal from "./newSurvivorModal";
import { Survivor } from "@/lib/types/survivor";
import { useQuery } from "@tanstack/react-query";
import { FetchSurvivors } from "@/lib/services/survivor";
import { useParams } from "react-router-dom";
import { useAuth } from "@clerk/clerk-react";

export const PopulationQueryKey = "population";
function topContent() {
  return (
    <div className="w-full flex flex-row-reverse">
      <NewSurvivorModal />
    </div>
  );
}

export default function SurvivorTable() {
  const { settlementId } = useParams();
  const { getToken, isLoaded } = useAuth();

  if (!settlementId) {
    throw Error("settlement id is required");
  }
  const getPopulation = async () => {
    try {
      const token = await getToken();
      if (!token) {
        throw Error("must be logged in");
      }
      const response = await FetchSurvivors(settlementId, token);
      if (!response) return null;
      return response;
    } catch (e) {
      console.log(e);
      return null;
    }
  };
  const { isPending, isError, data, error } = useQuery({
    queryKey: [PopulationQueryKey],
    queryFn: getPopulation,
  });

  if (isPending || !isLoaded) {
    return <Spinner />;
  }

  if (isError) {
    throw new Error(error.message);
  }

  const population = data as Array<Survivor>;
  console.log(population);
  return (
    <Table
      isStriped
      aria-label="Survivor Table"
      topContent={topContent()}
      topContentPlacement="outside"
    >
      <TableHeader>
        <TableColumn key="name" align="center">
          Name
        </TableColumn>
        <TableColumn key="gender" align="center">
          Gender
        </TableColumn>
        <TableColumn key="huntXp" align="center">
          Hunt XP
        </TableColumn>
        <TableColumn key="movement" align="center">
          Movement
        </TableColumn>
        <TableColumn key="accuracy" align="center">
          Accuracy
        </TableColumn>
        <TableColumn key="strength" align="center">
          Strength
        </TableColumn>
        <TableColumn key="evasion" align="center">
          Evasion
        </TableColumn>
        <TableColumn key="luck" align="center">
          Luck
        </TableColumn>
        <TableColumn key="speed" align="center">
          Speed
        </TableColumn>
      </TableHeader>
      <TableBody
        emptyContent={"No rows to display."}
        items={population}
        isLoading={isPending}
        loadingContent={<Spinner />}
      >
        {(item) => (
          <TableRow key={item.name}>
            {(columnKey) => (
              <TableCell>{getKeyValue(item, columnKey)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
