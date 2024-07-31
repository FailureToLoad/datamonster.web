// component sourced from this article
// https://dev.to/mdmostafizurrahaman/how-to-make-a-rating-component-with-react-typescript-396p
import React from "react";

interface TallyProps {
  className?: string;
  count: number;
  value: number;
  color?: string;
  hoverColor?: string;
  activeColor?: string;
  size?: number;
  edit?: boolean;
  isHalf?: boolean;
  onChange?: (value: number) => void;
  emptyIcon?: React.ReactElement;
  halfIcon?: React.ReactElement;
  fullIcon?: React.ReactElement;
}

interface IconProps {
  size?: number;
  color?: string;
}

const FullTally = ({ size = 24, color = "#000000" }: IconProps) => {
  return (
    <div style={{ color: color }}>
      <svg height={size} viewBox="0 0 24 24" overflow="visible">
        <path
          d="M 0,-1.0043288 V 17.995648 H 19.999959 V -1.0043288 Z M 1.8628319,0.85850325 H 18.137127 V 16.132816 H 1.8628319 Z M 5.1428591,4.1670564 V 12.824203 H 14.857099 V 4.1670564 Z"
          fill="currentColor"
        />
      </svg>
    </div>
  );
};

const EmptyTally = ({ size = 24, color = "#000000" }: IconProps) => {
  return (
    <div style={{ color: color }}>
      <svg height={size} viewBox="0 0 24 24" overflow="visible">
        <path
          d="M 0,-1.0043288 V 17.995648 H 19.999959 V -1.0043288 Z M 1.8628319,0.85850325 H 18.137127 V 16.132816 H 1.8628319 Z"
          fill="currentColor"
        />
      </svg>
    </div>
  );
};

const Tally: React.FC<TallyProps> = ({
  count,
  value = 0,
  color = "#ffd700",
  activeColor = "#ffc107",
  size = 30,
  edit = true,
  onChange,
  emptyIcon = <EmptyTally />,
  fullIcon = <FullTally />,
}) => {
  const handleClick = (index: number) => {
    if (!edit) {
      return;
    }
    if (onChange) {
      onChange(index + 1);
    }
  };

  const getColor = (index: number) => {
    if (value > index) {
      return activeColor;
    }
    return color;
  };

  const tallies = [];

  for (let i = 0; i < count; i++) {
    let star: React.ReactElement;
    if (i < value) {
      star = fullIcon;
    } else {
      star = emptyIcon;
    }

    tallies.push(
      <div key={i} style={{ cursor: "pointer" }} onClick={() => handleClick(i)}>
        {React.cloneElement(star, {
          size: size,
          color: getColor(i),
        })}
      </div>
    );
  }

  return <div className="flex items-center gap-1.5">{tallies}</div>;
};

export default Tally;
