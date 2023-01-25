import { render, screen, waitFor } from "@testing-library/react";
import { describe, it, vi, beforeEach, expect } from "vitest";
import { GenerateRows } from "./GenerateRows";
import {
  GetPaginatedEnablees,
  GetEnableesPendingPodAssignment,
} from "../../services/EnableeAPI";
import IPageOfItems from "../../models/interfaces/IPageOfItems";
import IEnablee from "../../models/interfaces/IEnablee";
import { dummyEnablees } from "../../data/EnableeMock";

vi.mock("../../services/EnableeAPI");
const mockGetPaginatedEnablees = GetPaginatedEnablees as jest.Mock;
const mockGetEnableesPendingPodAssignment =
  GetEnableesPendingPodAssignment as jest.Mock;
let expectedMockPaginatedEnablees: IPageOfItems<IEnablee>;

beforeEach(() => {
  mockGetPaginatedEnablees.mockRestore();
  mockGetEnableesPendingPodAssignment.mockRestore();
  expectedMockPaginatedEnablees = {
    items: dummyEnablees,
    hasNext: false,
    totalElements: dummyEnablees.length,
  };
});

describe("Generate Rows component", () => {
  it("Should generate a list of row components", async () => {
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
});
