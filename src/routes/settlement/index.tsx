import { UserButton } from "@clerk/clerk-react";
import { Tooltip } from "@nextui-org/react";
import {
  CalendarBlank,
  Dresser,
  IconProps,
  UsersThree,
} from "@phosphor-icons/react";
import { Link, Outlet, useLocation } from "react-router-dom";

function LeftNav() {
  const { pathname } = useLocation();
  const timelineKey = "timeline";
  const populationKey = "population";
  const storageKey = "storage";
  const getProps = (active: boolean): IconProps => {
    const props: IconProps = {
      size: 32,
    };
    if (active) {
      props.weight = "fill";
      props.className = "text-primary";
    }
    return props;
  };
  return (
    <div className="h-screen absolute grid top-0 left-0 p-4">
      <div className="flex flex-col gap-4">
        <Tooltip key={timelineKey} placement="right" content={"Timeline"}>
          <Link to={timelineKey} color="foreground">
            <CalendarBlank {...getProps(pathname.includes(timelineKey))} />
          </Link>
        </Tooltip>
        <Tooltip key={populationKey} placement="right" content={"Population"}>
          <Link to={populationKey} color="foreground">
            <UsersThree {...getProps(pathname.includes(populationKey))} />
          </Link>
        </Tooltip>
        <Tooltip key={storageKey} placement="right" content={"Storage"}>
          <Link to={storageKey} color="foreground">
            <Dresser {...getProps(pathname.includes(storageKey))} />
          </Link>
        </Tooltip>
      </div>

      <div className="flex self-end justify-self-end place-self-end">
        <UserButton />
      </div>
    </div>
  );
}

export default function SettlementPage() {
  return (
    <>
      <LeftNav />
      <div className="flex h-screen w-full flex-col justify-center overflow-auto">
        <div className="p-16 flex flex-1 justify-center">
          <Outlet />
        </div>
      </div>
    </>
  );
}
