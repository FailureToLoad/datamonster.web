import AddSettlementModal from "@/components/settlements/creationModal";
import { GetSettlements, CreateSettlement } from "@/lib/services/settlement";
import { SettlementCard } from "@/components/settlements/card";
import { useAuth } from "@clerk/clerk-react";
import { Spinner } from "@nextui-org/react";
import { Settlement } from "@/lib/types/settlements";
import { useQuery } from "@tanstack/react-query";

export default function SettlementsPage() {
  const { getToken } = useAuth();
  const getSettlements = async () => {
    try {
      const token = await getToken();
      if (token === null || token === "") {
        return null;
      }
      const settlements = await GetSettlements(token);
      return settlements;
    } catch (e) {
      console.log(e);
      return null;
    }
  };

  const { isPending, isError, data, error } = useQuery({
    queryKey: ["settlements"],
    queryFn: getSettlements,
  });

  if (isPending) {
    return <Spinner />;
  }

  if (isError) {
    throw new Error(error.message);
  }

  const settlements = data as Array<Settlement>;
  return (
    <main className="flex w-screen h-screen flex-col items-center justify-center overflow-hidden">
      <ul className="w-1/4 space-y-4 ">
        {settlements &&
          settlements.map((settlement) => (
            <li key={settlement.id}>
              <SettlementCard settlement={settlement} />
            </li>
          ))}
        <li key={-1}>
          <AddSettlementModal createSettlement={CreateSettlement} />
        </li>
      </ul>
    </main>
  );
}
