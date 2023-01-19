import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import React from "react";
import { describe, it, expect, vi, afterEach } from "vitest";
import { GetPaginatedEnablees } from "../../../services/EnableeAPI";
import EnableeView from "./EnableeView";
import { dummyEnablees } from "../../../data/EnableeMock";

// Don't need to render carousel, its already in the Enablee View
// Mock the api call
// Call the buttons in carousel to test the set, and make sure buttons change active number displayed in carousel, and form input displayed in carousel
// Makes sure it maps enablees? or maybe test this in Enablee View.
vi.mock("../../../services/EnableeAPI");
describe("Enablee View page", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  // it("should display enablee view page with correct components", () => {
  //   render(<EnableeView />);
  // });

  // it('should enable previous page button after clicking "Next page"', () => {
  //   render(<EnableeView />);
  //   const previousPageButton = screen.getByRole("button", {
  //     name: "Previous page",
  //   });
  //   const nextPageButton = screen.getByRole("button", {
  //     name: "Next page",
  //   });
  //   fireEvent.click(nextPageButton);
  //   expect(previousPageButton).toBeEnabled();
  // });

  // it('should enable previous page button after clicking "Next page"', () => {
  //   render(<EnableeView />);
  //   const nextPageButton = screen.getByRole("button", {
  //     name: "Next page",
  //   });
  //   for (let i = 0; i < 100; i++) {
  //     console.log(i)
  //     fireEvent.click(nextPageButton);
  //   }
  //   expect(nextPageButton).toBeDisabled();
  // });

  it('should enable previous page button after clicking "Next page"', async () => {
    // jest.spyOn(React, 'useEffect').mockImplementation((f) => f())
    // jest.spyOn( GetPaginatedEnablees,'GetPaginatedEnablees')

    const pageOfItem = {
      data: {
        items: dummyEnablees,
        hasNext: false,
        totalElements: 150,
      }
    };
    (GetPaginatedEnablees as jest.Mock).mockResolvedValue(pageOfItem);
    render(<EnableeView />);

    await waitFor(() => {
      const nextPageButton = screen.getByRole("button", {
        name: "Next page",
      })
      for (let i = 0; i < 1; i++) {
        fireEvent.click(nextPageButton);
      }
      // console.log(nextPageButton.innerHTML)
      const display = screen.getByText("5")
      expect(nextPageButton).toBeDisabled();
    });

    // expect(GetPaginatedEnablees).toBeCalledTimes(2)
    // expect(display).toBeInTheDocument()
  });
});
