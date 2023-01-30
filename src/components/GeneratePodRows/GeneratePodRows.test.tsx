import { render, screen } from "@testing-library/react";
import { describe, it, vi, expect } from "vitest";
import { GeneratePodRows } from "./GeneratePodRows";
import {
  convertToStringArr,
  getActivePendingPodTag,
  getAvailablePodTag,
} from "../../utils/utilityFunctions";
import { mockFePod } from "../../data/MockFEPod";

vi.mock("../../utils/utilityFunctions");

const mockGetActivePendingPodTag =
  getActivePendingPodTag as jest.MockedFunction<typeof getActivePendingPodTag>;
const mockConvertToStringArr = convertToStringArr as jest.MockedFunction<
  typeof convertToStringArr
>;
const techList = ["Java", ".Net", "React", "JavaScript"];

describe("Generate Pod Rows component", () => {
  it("Should generate a list of row components", () => {
    mockConvertToStringArr.mockReturnValue(techList);
    mockGetActivePendingPodTag.mockReturnValue({
      name: "Active",
      color: "#E63946",
    });
    render(
      <GeneratePodRows
        pageNum={1}
        pods={mockFePod}
        displayTag={mockGetActivePendingPodTag}
      />
    );
  });

  it("Should generate a list of row components with Enablers", () => {
    const expectedMockEnabler = {
      employeeId: 123,
      firstName: "Test",
      lastName: "Tester",
      assetTag: "",
      isActive: true,
      technology: [],
      countryCode: 0,
      communityId: 0,
      employmentTypeId: 0,
      podId: [],
    };

    mockConvertToStringArr.mockReturnValue(techList);
    mockGetActivePendingPodTag.mockReturnValue({
      name: "Active",
      color: "#E63946",
    });
    mockFePod[0].enabler = [expectedMockEnabler];

    render(
      <GeneratePodRows
        pageNum={1}
        pods={mockFePod}
        displayTag={mockGetActivePendingPodTag}
      />
    );
    expect(
      screen.getByText(`Enabler(s): ${expectedMockEnabler.firstName}`)
    ).toBeInTheDocument();
  });
});
