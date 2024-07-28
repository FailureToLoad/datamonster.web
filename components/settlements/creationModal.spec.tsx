import { render, screen, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, Mock } from "vitest";
import AddSettlementModal from "./creationModal";
import userEvent from "@testing-library/user-event";

function renderComponent(mockCreateSettlement: Mock) {
  const props = {
    createSettlement: mockCreateSettlement,
  };
  return render(
    <div>
      <AddSettlementModal createSettlement={mockCreateSettlement} />
    </div>
  );
}

describe("Settlements Modal", () => {
  const mockCreateSettlement = vi.fn();
  it("should launch the modal when the plus button is clicked", async () => {
    const { getByLabelText } = renderComponent(mockCreateSettlement);
    const plusButton = getByLabelText("Add Settlement");
    expect(plusButton).toBeInTheDocument();
    userEvent.click(plusButton);

    await waitFor(() => {
      expect(screen.queryByTestId("settlement-modal")).toBeInTheDocument();
    });
  });
  it("should not submit short settlement names", async () => {
    const { getByLabelText } = renderComponent(mockCreateSettlement);
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
    expect(mockCreateSettlement).not.toHaveBeenCalled();
  });
  it("should not submit long settlement names", async () => {
    const { getByLabelText } = renderComponent(mockCreateSettlement);
    const plusButton = getByLabelText("Add Settlement");
    expect(plusButton).toBeInTheDocument();
    const user = userEvent.setup();
    user.click(plusButton);

    await vi.waitFor(() => {
      expect(screen.queryByTestId("settlement-modal")).toBeInTheDocument();
    });

    const nameInput = screen.getByLabelText("Settlement Name");

    const tooLongText = "aaaaAaaaaAaaaaAaaaaAaaaaAaaaaA";
    user.click(nameInput);
    user.paste(tooLongText);

    const submitButton = screen.getByRole("button", { name: /add/i });
    user.click(submitButton);
    await vi.waitFor(() => {
      expect(nameInput.getAttribute("aria-invalid")).toBe("true");
    });
    expect(mockCreateSettlement).not.toHaveBeenCalled();
  });
  it("should submit valid names", async () => {
    const { getByLabelText } = renderComponent(mockCreateSettlement);
    const plusButton = getByLabelText("Add Settlement");
    expect(plusButton).toBeInTheDocument();
    const user = userEvent.setup();
    user.click(plusButton);

    await vi.waitFor(() => {
      expect(screen.queryByTestId("settlement-modal")).toBeInTheDocument();
    });

    // Find the input field for the settlement name
    const nameInput = screen.getByLabelText("Settlement Name");
    user.click(nameInput);
    user.paste("valid");
    // Enter a short settlement name
    // Assert that the input field has aria-invalid set to true
    await vi.waitFor(() => {
      expect(nameInput.getAttribute("aria-invalid")).toBe(null);
    });
    // Click the "Add" button to submit the form
    const submitButton = screen.getByRole("button", { name: /add/i });
    user.click(submitButton);

    await vi.waitFor(() => {
      expect(mockCreateSettlement).toHaveBeenCalled();
    });
  });
});
