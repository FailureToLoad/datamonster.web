import { RatingGroup } from "@ark-ui/react";
import { Tooltip } from "@nextui-org/react";
import { IconProps, Square } from "@phosphor-icons/react";

interface TallyProps {
  count: number;
  value: number;
  marks: Mark[];
  updateValue: (newValue: number) => void;
}

interface Mark {
  pos: number;
  val: string;
}

export default function Tally({
  count,
  value,
  marks,
  updateValue,
}: TallyProps) {
  const getSquare = (highlighted: boolean, index: number) => {
    const mark = marks.find((element) => element.pos === index);
    const iconProps: IconProps = {
      className: "size-full",
    };
    if (highlighted) {
      iconProps.weight = "fill";
      iconProps.color = "black";
    }
    if (mark) {
      if (highlighted) {
        iconProps.color = "red";
      }

      return (
        <Tooltip content={mark.val} delay={200} closeDelay={0}>
          <Square {...iconProps} />
        </Tooltip>
      );
    }
    return <Square {...iconProps} />;
  };
  return (
    <div className="flex  flex-col max-w-full">
      <RatingGroup.Root
        count={count}
        defaultValue={value}
        onValueChange={(details) => updateValue(details.value)}
      >
        <RatingGroup.Label>Hunt XP</RatingGroup.Label>
        <RatingGroup.Control className="flex flex-row gap-1 items-center justify-between w-full">
          <RatingGroup.Context>
            {({ items }) =>
              items.map((item) => (
                <RatingGroup.Item
                  key={item}
                  index={item}
                  className="flex flex-auto size-full justify-center"
                >
                  <RatingGroup.ItemContext>
                    {({ highlighted }) => getSquare(highlighted, item)}
                  </RatingGroup.ItemContext>
                </RatingGroup.Item>
              ))
            }
          </RatingGroup.Context>
          <RatingGroup.HiddenInput />
        </RatingGroup.Control>
      </RatingGroup.Root>
    </div>
  );
}
