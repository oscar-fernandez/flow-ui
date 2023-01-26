import { render, screen, waitFor } from "@testing-library/react";
import { describe, it, vi, beforeEach, expect } from "vitest";
import { GenerateRows } from "./GenerateRows";
import {
  GetPaginatedEnablees,
  GetEnableesWithNoStartDate,
} from "../../services/EnableeAPI";
import IPageOfItems from "../../models/interfaces/IPageOfItems";
import IEnablee from "../../models/interfaces/IEnablee";
import { dummyEnablees } from "../../data/EnableeMock";

vi.mock("../../services/EnableeAPI");
const mockGetPaginatedEnablees = GetPaginatedEnablees as jest.Mock;
const mockGetEnableesWithNoStartDate = GetEnableesWithNoStartDate as jest.Mock;
let expectedMockPaginatedEnablees: IPageOfItems<IEnablee>;
let expectedMockPendingStartEnablees: IEnablee[];

beforeEach(() => {
  mockGetPaginatedEnablees.mockRestore();
  mockGetEnableesWithNoStartDate.mockRestore();
  expectedMockPaginatedEnablees = {
    items: dummyEnablees,
    hasNext: false,
    totalElements: dummyEnablees.length,
  };
  expectedMockPendingStartEnablees = dummyEnablees;
});

describe("Generate Rows component", () => {
  it("Should generate a list of paginated row components", async () => {
    mockGetPaginatedEnablees.mockResolvedValueOnce({
      data: expectedMockPaginatedEnablees,
    });
    const expectedEnablee = expectedMockPaginatedEnablees.items[0];

    render(<GenerateRows pageNum={1} />);

    await waitFor(() => {
      expect(
        screen.getByText(
          `${expectedEnablee.firstName} ${expectedEnablee.lastName}`
        )
      ).toBeInTheDocument();
    });
  });

  it("Should generate a list of enablees with no start date row components", async () => {
    mockGetEnableesWithNoStartDate.mockResolvedValueOnce({
      data: expectedMockPendingStartEnablees,
    });
    const expectedEnablee = expectedMockPendingStartEnablees[0];

    render(<GenerateRows pageNum={-1} />);

    await waitFor(() => {
      expect(
        screen.getByText(
          `${expectedEnablee.firstName} ${expectedEnablee.lastName}`
        )
      ).toBeInTheDocument();
    });
  });
});
