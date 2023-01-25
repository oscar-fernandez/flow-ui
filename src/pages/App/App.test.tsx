import { describe, it, expect } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";

describe("App", () => {
  it("should render PageContainer", () => {
    render(<App />);
  });

  it("should contain input field props title of page", async () => {
    render(<App />);

    const plusButton = screen.getByText("+");
    userEvent.click(plusButton);

    await waitFor(() => screen.findByTestId("drawer"));
    const sideBar = screen.getByTestId("drawer");
    expect(sideBar).toBeInTheDocument();
  });
});
