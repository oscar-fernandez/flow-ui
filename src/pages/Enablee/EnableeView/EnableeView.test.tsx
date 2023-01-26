import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi, beforeAll } from "vitest";
import { GetPaginatedEnablees } from "../../../services/EnableeAPI";
import EnableeView from "./EnableeView";
import { dummyEnablees } from "../../../data/EnableeMock";

// Don't need to render carousel, its already in the Enablee View
// Mock the api call
// Call the buttons in carousel to test the set, and make sure buttons change active number displayed in carousel, and form input displayed in carousel
// Makes sure it maps enablees? or maybe test this in Enablee View.
vi.mock("../../../services/EnableeAPI");
describe("Async tests for enablee View", () => {
  beforeAll(() => {
    const pageOfItem = {
      data: {
        items: [dummyEnablees[0]],
        hasNext: false,
        totalElements: 150,
      },
    };
    (GetPaginatedEnablees as jest.Mock).mockResolvedValue(pageOfItem);
  });

  it('should enable previous page button after clicking "Next page"', async () => {
    render(<EnableeView />);
    const previousPageButton = screen.getByRole("button", {
      name: "Previous page",
    });
    const nextPageButton = screen.getByRole("button", {
      name: "Next page",
    });
    await userEvent.click(nextPageButton);
    expect(previousPageButton).toBeEnabled();
  });

  it('should enable previous page button after clicking "Next page"', async () => {
    render(<EnableeView />);
    const nextPageButton = screen.getByRole("button", {
      name: "Next page",
    });

    for (let i = 0; i < 5; i++) {
      userEvent.click(nextPageButton);
    }

    await waitFor(() => {
      expect(nextPageButton).toBeDisabled();
    });
  });

  it("goes to the page that is submitted by the user", async () => {
    render(<EnableeView />);

    const input = screen.getByTestId("CarouselInput");
    const goButton = screen.getByRole("button", { name: "Go" });
    await userEvent.type(input, "3");
    await userEvent.click(goButton);
    const nextPageButton = screen.getByRole("button", {
      name: "Next page",
    });
    const previousPageButton = screen.getByRole("button", {
      name: "Previous page",
    });
    await waitFor(() => {
      expect(previousPageButton).toBeEnabled();
    });
    await waitFor(() => {
      expect(nextPageButton).toBeEnabled();
    });
  });

  it("Try to go to page that is above max page, should give error message", async () => {
    render(<EnableeView />);

    const input = screen.getByTestId("CarouselInput");
    const goButton = screen.getByRole("button", { name: "Go" });
    await userEvent.type(input, "100");
    await userEvent.click(goButton);
    const errorMessage = screen.getByText("* Invalid Page Number");
    await waitFor(() => {
      expect(errorMessage).toBeInTheDocument();
    });
  });
});
