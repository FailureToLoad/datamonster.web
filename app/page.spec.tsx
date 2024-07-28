import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import Page from "./page";

describe("Landing Page", () => {
  it("should have the correct heading", async () => {
    render(await Page());
    expect(
      screen.getByRole("heading", { level: 1, name: "Datamonster" })
    ).toBeDefined();
  });
});
