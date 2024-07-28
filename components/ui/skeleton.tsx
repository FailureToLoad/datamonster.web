import { cn } from "@/lib/utils";

// function Skeleton({
//   className,
//   ...props
// }: React.HTMLAttributes<HTMLDivElement>) {
//   return (
//     <div
//       className={cn("animate-pulse rounded-md bg-primary/10", className)}
//       {...props}
//     />
//   );
// }

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={className} {...props}>
      <span className="inline-flex w-full animate-pulse select-none rounded-md bg-primary/10 leading-none">
        ‌
      </span>
    </div>
  );
}

function SVGSkeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-primary/10", className)}
      {...props}
    />
  );
}

export { Skeleton };
