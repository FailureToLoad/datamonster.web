import { Survivor } from "@/lib/types/survivor";

export async function CreateSurvivor(survivor: Survivor, settlementId: string) {
  const accessToken = "update token logic";
  const req = `${
    import.meta.env.VITE_API_HOST
  }/settlements/${settlementId}/survivors`;
  const response = await fetch(req, {
    method: "post",
    headers: new Headers({
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    }),
    body: JSON.stringify(survivor),
  });

  if (!response.ok) {
    throw new Error("survivor creation failed");
  }
}
