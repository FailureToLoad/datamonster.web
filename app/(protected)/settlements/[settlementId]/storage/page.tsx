"use server";
import { Suspense } from "react";
import { SettlementStorageSkeleton } from "./skeleton";

export default async function SettlementStoragePage() {
  return (
    <div id="storage" className="flex flex-1 items-center justify-center">
      <Suspense fallback={<SettlementStorageSkeleton />}>Storage</Suspense>
    </div>
  );
}
