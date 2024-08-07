import React, { useState } from "react";
import { IconProps, Square } from "@phosphor-icons/react";

import { cn } from "@/lib/utils";

export interface RatingsProps extends React.HTMLAttributes<HTMLDivElement> {
  rating: number;
  max?: number;
  size?: number;
  Icon?: React.ReactElement;
  onTallyChange?: (rating: number) => void;
}

const Tally = ({
  rating: ratingValue,
  max = 10,
  size = 20,
  Icon = <Square />,
  className: customClassName,
  onTallyChange,
  ...props
}: RatingsProps) => {
  const [hoverRating, setHoverRating] = useState<number | null>(null);
  const [currentRating, setCurrentRating] = useState(ratingValue);

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

  const getIconProps = (index: number) => {
    const props: IconProps = {
      size: size,
    };
    const rating = hoverRating ?? currentRating;
    const fill = index <= rating && index > 0;
    if (fill) {
      props.weight = "fill";
    }

    return props;
  };

  const boxes = Math.floor(max);

  return (
    <div
      className={cn("flex items-center gap-2", customClassName)}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      <div className="w-full flex items-center" onMouseEnter={handleMouseEnter}>
        {[...Array(boxes)].map((_, i) =>
          React.cloneElement(Icon, {
            key: i + 1,
            ...getIconProps(i + 1),
            onClick: handleClick,
            onMouseEnter: handleMouseEnter,
            "data-box-index": i + 1,
          })
        )}
      </div>
    </div>
  );
};

export default Tally;
