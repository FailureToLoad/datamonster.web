import Spinner from "@/components/spinner";
import { Survivor } from "@/lib/types/survivor";
import { useQuery } from "@tanstack/react-query";
import { FetchSurvivors } from "@/lib/services/survivor";
import { useParams } from "react-router-dom";
import { useAuth } from "@clerk/clerk-react";
import { DataTable } from "./data-table";
import { columns } from "./columns";

export const PopulationQueryKey = "population";
export default function PopulationTab() {
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
  return (
    <div id="population" className="max-w-fit py-4">
      <DataTable data={population} columns={columns}/>
    </div>
  );
}
