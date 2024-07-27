import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { GetSettlements } from "./actions";
import SettlementsPage from "./page";
import { Settlement } from "@/lib/types/settlements";
import userEvent from "@testing-library/user-event";
vi.mock("./actions.ts");

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

describe("Settlements Modal", () => {
  it("should launch the modal when the plus button is clicked", async () => {
    vi.mocked(GetSettlements).mockReturnValue(Promise.resolve([]));
    const page = await SettlementsPage();
    const { getByLabelText } = render(page);
    const plusButton = getByLabelText("Add Settlement");
    expect(plusButton).toBeInTheDocument();
    userEvent.click(plusButton);

    await waitFor(() => {
      expect(screen.queryByTestId("settlement-modal")).toBeInTheDocument();
    });
  });
  it("should not submit short settlement names", async () => {
    vi.mocked(GetSettlements).mockReturnValue(Promise.resolve([]));
    const { getByLabelText } = render(await SettlementsPage());
    const plusButton = getByLabelText("Add Settlement");
    expect(plusButton).toBeInTheDocument();
    const user = userEvent.setup();
    user.click(plusButton);

    await vi.waitFor(() => {
      expect(screen.queryByTestId("settlement-modal")).toBeInTheDocument();
    });

    const submitButton = screen.getByRole("button", { name: /add/i });
    user.click(submitButton);

    const nameInput = screen.getByLabelText("Settlement Name");
    await vi.waitFor(() => {
      expect(nameInput.getAttribute("aria-invalid")).toBe("true");
    });
  });
  it("should not submit long settlement names", async () => {
    vi.mocked(GetSettlements).mockReturnValue(Promise.resolve([]));
    const { getByLabelText } = render(await SettlementsPage());
    const plusButton = getByLabelText("Add Settlement");
    expect(plusButton).toBeInTheDocument();
    const user = userEvent.setup();
    user.click(plusButton);

    await vi.waitFor(() => {
      expect(screen.queryByTestId("settlement-modal")).toBeInTheDocument();
    });

    // Find the input field for the settlement name
    const nameInput = screen.getByLabelText("Settlement Name");

    const tooLongText = "aaaaAaaaaAaaaaAaaaaAaaaaAaaaaA";
    user.click(nameInput);
    user.paste(tooLongText);
    // Enter a short settlement name

    // Click the "Add" button to submit the form
    const submitButton = screen.getByRole("button", { name: /add/i });
    user.click(submitButton);

    // Assert that the input field has aria-invalid set to true
    await vi.waitFor(() => {
      expect(nameInput.getAttribute("aria-invalid")).toBe("true");
    });
  });
  it("should submit valid names", async () => {
    vi.mocked(GetSettlements).mockReturnValue(Promise.resolve([]));
    const { getByLabelText } = render(await SettlementsPage());
    const plusButton = getByLabelText("Add Settlement");
    expect(plusButton).toBeInTheDocument();
    const user = userEvent.setup();
    user.click(plusButton);

    await waitFor(() => {
      expect(screen.queryByTestId("settlement-modal")).toBeInTheDocument();
    });

    // Find the input field for the settlement name
    const nameInput = screen.getByLabelText("Settlement Name");
    user.click(nameInput);
    user.paste("valid");
    // Enter a short settlement name

    // Click the "Add" button to submit the form
    const submitButton = screen.getByRole("button", { name: /add/i });
    user.click(submitButton);

    // Assert that the input field has aria-invalid set to true
    await waitFor(() => {
      expect(nameInput.getAttribute("aria-invalid")).toBe(null);
    });
  });
});
