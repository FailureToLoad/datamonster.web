import { render, screen, waitFor } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { CreateSettlement, GetSettlements } from "./actions";
import SettlementsPage from "./page";
import { Settlement } from "@/lib/types/settlements";
import userEvent from "@testing-library/user-event";

vi.mock("./actions");

function makeTwoSettlements(
  firstName: string,
  secondName: string
): Array<Settlement> {
  return [
    {
      id: "1",
      name: firstName,
      limit: 1,
      departing: 0,
      cc: 0,
      year: 1,
    },
    {
      id: "2",
      name: secondName,
      limit: 1,
      departing: 0,
      cc: 0,
      year: 1,
    },
  ];
}

describe("Settlements Page", () => {
  it("should have a button to add a settlement", async () => {
    vi.mocked(GetSettlements).mockReturnValue(Promise.resolve([]));
    const { getByLabelText } = render(await SettlementsPage());
    const trigger = getByLabelText("Add Settlement");
    expect(trigger).toBeDefined();
  });
  it("should render a list of settlements", async () => {
    const firstName = "first";
    const secondName = "second";
    const settlementsPromise = Promise.resolve(
      makeTwoSettlements(firstName, secondName)
    );
    vi.mocked(GetSettlements).mockReturnValue(settlementsPromise);
    const { getByLabelText } = render(await SettlementsPage());
    const firstSettlement = getByLabelText(firstName);
    expect(firstSettlement).toBeInTheDocument();
    const secondSettlement = getByLabelText(secondName);
    expect(secondSettlement).toBeInTheDocument();
  });
});
