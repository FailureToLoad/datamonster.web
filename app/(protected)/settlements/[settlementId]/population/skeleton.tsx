"use client";
import { Skeleton } from "@/components/ui/skeleton";

export const SurvivorTableSkeleton = () => (
  <>
    <div className="flex flex-1 items-center justify-center">
      <div>
        <div className="flex items-center py-4">
          <div className="inline-flex items-center justify-center transition-colors border border-input shadow-sm h-9 px-4 py-2 rounded-md">
            <Skeleton className="w-[24px] h-[24px]" />
          </div>
          <div className="inline-flex items-center justify-center transition-colors border border-input shadow-sm h-9 px-4 py-2 ml-auto rounded-md">
            <Skeleton className="w-[56px] max-w-full" />
          </div>
        </div>
        <div className="border rounded-md">
          <div className="relative w-full overflow-auto">
            <table className="w-[51.5rem] caption-bottom">
              <thead className="border-b transition-colors">
                <tr className="w-full">
                  <th className="h-10 px-2 text-left align-middle">
                    <Skeleton className="w-full" />
                  </th>
                  <th className="h-10 px-2 text-left align-middle">
                    <Skeleton className="w-full" />
                  </th>
                  <th className="h-10 px-2 text-left align-middle">
                    <Skeleton className="w-full" />
                  </th>
                  <th className="h-10 px-2 text-left align-middle">
                    <Skeleton className="w-full" />
                  </th>
                  <th className="h-10 px-2 text-left align-middle">
                    <Skeleton className="w-full" />
                  </th>
                  <th className="h-10 px-2 text-left align-middle">
                    <Skeleton className="w-full" />
                  </th>
                  <th className="h-10 px-2 text-left align-middle">
                    <Skeleton className="w-full" />
                  </th>
                  <th className="h-10 px-2 text-left align-middle">
                    <Skeleton className="w-full" />
                  </th>
                  <th className="h-10 px-2 text-left align-middle">
                    <Skeleton className="w-full" />
                  </th>
                  <th className="h-10 px-2 text-left align-middle">
                    <Skeleton className="w-full" />
                  </th>
                  <th className="h-10 px-2 text-left align-middle">
                    <Skeleton className="w-full" />
                  </th>
                  <th className="h-10 px-2 text-left align-middle">
                    <Skeleton className="w-full" />
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="transition-colors p-2 align-middle">
                  <td className="h-10 px-2 text-left align-middle">
                    <Skeleton className="w-full" />
                  </td>
                  <td className="h-10 px-2 text-left align-middle">
                    <Skeleton className="w-full" />
                  </td>
                  <td className="h-10 px-2 text-left align-middle">
                    <Skeleton className="w-full" />
                  </td>
                  <td className="h-10 px-2 text-left align-middle">
                    <Skeleton className="w-full" />
                  </td>
                  <td className="h-10 px-2 text-left align-middle">
                    <Skeleton className="w-full" />
                  </td>
                  <td className="h-10 px-2 text-left align-middle">
                    <Skeleton className="w-full" />
                  </td>
                  <td className="h-10 px-2 text-left align-middle">
                    <Skeleton className="w-full" />
                  </td>
                  <td className="h-10 px-2 text-left align-middle">
                    <Skeleton className="w-full" />
                  </td>
                  <td className="h-10 px-2 text-left align-middle">
                    <Skeleton className="w-full" />
                  </td>
                  <td className="h-10 px-2 text-left align-middle">
                    <Skeleton className="w-full" />
                  </td>
                  <td className="h-10 px-2 text-left align-middle">
                    <Skeleton className="w-full" />
                  </td>
                  <td className="h-10 px-2 text-left align-middle">
                    <Skeleton className="w-full" />
                  </td>
                </tr>
                <tr className="transition-colors p-2 align-middle">
                  <td className="h-10 px-2 text-left align-middle">
                    <Skeleton className="w-full" />
                  </td>
                  <td className="h-10 px-2 text-left align-middle">
                    <Skeleton className="w-full" />
                  </td>
                  <td className="h-10 px-2 text-left align-middle">
                    <Skeleton className="w-full" />
                  </td>
                  <td className="h-10 px-2 text-left align-middle">
                    <Skeleton className="w-full" />
                  </td>
                  <td className="h-10 px-2 text-left align-middle">
                    <Skeleton className="w-full" />
                  </td>
                  <td className="h-10 px-2 text-left align-middle">
                    <Skeleton className="w-full" />
                  </td>
                  <td className="h-10 px-2 text-left align-middle">
                    <Skeleton className="w-full" />
                  </td>
                  <td className="h-10 px-2 text-left align-middle">
                    <Skeleton className="w-full" />
                  </td>
                  <td className="h-10 px-2 text-left align-middle">
                    <Skeleton className="w-full" />
                  </td>
                  <td className="h-10 px-2 text-left align-middle">
                    <Skeleton className="w-full" />
                  </td>
                  <td className="h-10 px-2 text-left align-middle">
                    <Skeleton className="w-full" />
                  </td>
                  <td className="h-10 px-2 text-left align-middle">
                    <Skeleton className="w-full" />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="flex items-center justify-end space-x-2 py-4">
          <div className="inline-flex items-center justify-center transition-colors border border-input shadow-sm h-8 px-3 rounded-md">
            <Skeleton className="w-[64px] max-w-full" />
          </div>
          <div className="inline-flex items-center justify-center transition-colors border border-input shadow-sm h-8 px-3 rounded-md">
            <Skeleton className="w-[32px] max-w-full" />
          </div>
        </div>
      </div>
    </div>
  </>
);
