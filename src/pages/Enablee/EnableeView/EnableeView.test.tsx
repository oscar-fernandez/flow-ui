import {
  fireEvent,
  render,
  screen,
  waitFor,
  debug,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";

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
    const pageOfItem = {
      data: {
        items: [dummyEnablees[0]],
        hasNext: false,
        totalElements: 150,
      },
    };

    (GetPaginatedEnablees as jest.Mock).mockResolvedValue(pageOfItem);
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
});
