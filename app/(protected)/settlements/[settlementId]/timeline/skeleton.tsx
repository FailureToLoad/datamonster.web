"use client";
import { Skeleton } from "@/components/ui/skeleton";

export const TimelineSkeleton = () => (
  <>
    <div className="flex flex-1 items-center justify-center">
      <Skeleton className="w-[64px] max-w-full" />
    </div>
  </>
);
