import { RatingGroup, Tooltip } from "@ark-ui/react";

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
    const textColor = highlighted ? "text-white" : "text-black";
    let containerClass =
      "flex items-center justify-center size-10 border-2 border-black";
    if (highlighted) {
      containerClass = containerClass.concat(" bg-black");
    }

    if (mark) {
      return (
        <Tooltip.Root>
          <Tooltip.Trigger>
            <div className={containerClass}>
              <p className={`w-full ${textColor} text-center font-bold`}>!</p>
            </div>
          </Tooltip.Trigger>
          <Tooltip.Positioner>
            <Tooltip.Content>{mark.val}</Tooltip.Content>
          </Tooltip.Positioner>
        </Tooltip.Root>
      );
    }
    return <div className={containerClass} />;
  };
  return (
    <div className="flex flex-col gap-4">
      <RatingGroup.Root
        count={count}
        defaultValue={value}
        onValueChange={(details) => updateValue(details.value)}
      >
        <RatingGroup.Label>Hunt XP</RatingGroup.Label>
        <RatingGroup.Control className="flex flex-row gap-2">
          <RatingGroup.Context>
            {({ items }) =>
              items.map((item) => (
                <RatingGroup.Item key={item} index={item}>
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
