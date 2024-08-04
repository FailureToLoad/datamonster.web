import React, { useState } from "react";
import { Square } from "lucide-react";

import { cn } from "@/lib/utils";

const ratingVariants = {
  default: {
    box: "text-foreground",
    emptyBox: "text-muted-foreground",
  },
  destructive: {
    box: "text-red-500",
    emptyBox: "text-red-200",
  },
  yellow: {
    box: "text-yellow-500",
    emptyBox: "text-yellow-200",
  },
};

export interface RatingsProps extends React.HTMLAttributes<HTMLDivElement> {
  rating: number;
  max?: number;
  size?: number;
  fill?: boolean;
  Icon?: React.ReactElement;
  variant?: keyof typeof ratingVariants;
  onTallyChange?: (rating: number) => void;
}

const Tally = ({
  rating: initialRating,
  max = 5,
  size = 20,
  fill = true,
  Icon = <Square />,
  variant = "default",
  className: customClassName,
  onTallyChange,
  ...props
}: RatingsProps) => {
  const [hoverRating, setHoverRating] = useState<number | null>(null);
  const [currentRating, setCurrentRating] = useState(initialRating);

  const handleMouseEnter = (event: React.MouseEvent<HTMLDivElement>) => {
    const boxIndex = parseInt(
      (event.currentTarget as HTMLDivElement).dataset.boxIndex || "0"
    );
    setHoverRating(boxIndex);
  };

  const handleMouseLeave = () => {
    setHoverRating(null);
  };

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const boxIndex = parseInt(
      (event.currentTarget as HTMLDivElement).dataset.boxIndex || "0"
    );
    setCurrentRating(boxIndex);
    setHoverRating(null);
    onTallyChange?.(boxIndex);
  };

  const displayRating = hoverRating ?? currentRating;
  const fullBoxes = Math.floor(displayRating);
  const partialBox =
    displayRating % 1 > 0 ? (
      <PartialBox
        fillPercentage={displayRating % 1}
        size={size}
        className={cn(ratingVariants[variant].box)}
        Icon={Icon}
      />
    ) : null;

  return (
    <div
      className={cn("flex items-center gap-2", customClassName)}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      <div className="w-full flex items-center" onMouseEnter={handleMouseEnter}>
        {[...Array(fullBoxes)].map((_, i) =>
          React.cloneElement(Icon, {
            key: i,
            size,
            className: cn(
              fill ? "fill-current stroke-1" : "fill-transparent",
              ratingVariants[variant].box
            ),
            onClick: handleClick,
            onMouseEnter: handleMouseEnter,
            "data-box-index": i + 1,
          })
        )}
        {partialBox}
        {[...Array(Math.max(0, max - fullBoxes - (partialBox ? 1 : 0)))].map(
          (_, i) =>
            React.cloneElement(Icon, {
              key: i + fullBoxes + 1,
              size,
              className: cn("stroke-1", ratingVariants[variant].emptyBox),
              onClick: handleClick,
              onMouseEnter: handleMouseEnter,
              "data-box-index": i + fullBoxes + 1,
            })
        )}
      </div>
    </div>
  );
};

interface PartialBoxProps {
  fillPercentage: number;
  size: number;
  className?: string;
  Icon: React.ReactElement;
}

const PartialBox = ({ ...props }: PartialBoxProps) => {
  const { fillPercentage, size, className, Icon } = props;
  return (
    <div style={{ position: "relative", display: "inline-block" }}>
      {React.cloneElement(Icon, {
        size,
        className: cn("fill-transparent", className),
      })}
      <div
        style={{
          position: "absolute",
          top: 0,
          overflow: "hidden",
          width: `${fillPercentage * 100}%`,
        }}
      >
        {React.cloneElement(Icon, {
          size,
          className: cn("fill-current", className),
        })}
      </div>
    </div>
  );
};

export default Tally;
