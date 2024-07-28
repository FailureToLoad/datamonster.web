"use server";
import { Suspense } from "react";
import { TimelineSkeleton } from "./skeleton";

export default async function Timeline() {
  return (
    <div id="timeline" className="flex flex-1 items-center justify-center">
      <Suspense fallback={<TimelineSkeleton />}>Timeline</Suspense>
    </div>
  );
}
