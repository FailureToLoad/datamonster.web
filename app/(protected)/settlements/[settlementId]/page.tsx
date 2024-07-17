import { redirect } from "next/navigation";

export default function SettlementLandingPage({
  params,
}: {
  params: {
    settlementId: string;
  };
}) {
  redirect(`${params.settlementId}/population`);
}
