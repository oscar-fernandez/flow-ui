import { render, screen } from "@testing-library/react";
import { describe, it, vi, expect } from "vitest";
import { GeneratePodRows } from "./GeneratePodRows";
import {
  convertToStringArr,
  generatePodTags,
} from "../../utils/utilityFunctions";
import { mockFePod } from "../../data/MockFEPod";

vi.mock("../../utils/utilityFunctions");

const mockGetActivePendingPodTag = generatePodTags as jest.MockedFunction<
  typeof generatePodTags
>;
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
        pods={mockFePod}
        displayTag={mockGetActivePendingPodTag}
        location={"Active"}
      />
    );
  });

  it("Should generate a list of row components with Enablers", () => {
    const expectedMockEnabler = {
      employeeId: 123,
      firstName: "Test",
      lastName: "Tester",
      assetTag: "",
      isEmployed: true,
      technology: [],
      city: "TestCity",
      state: "TestState",
      country: "TestCountry",
      communityId: 0,
      employmentTypeId: 0,
    };

    mockConvertToStringArr.mockReturnValue(techList);
    mockGetActivePendingPodTag.mockReturnValue({
      name: "Active",
      color: "#E63946",
    });
    mockFePod[0].enabler = [expectedMockEnabler];

    render(
      <GeneratePodRows
        pods={mockFePod}
        displayTag={mockGetActivePendingPodTag}
        location={"Available"}
      />
    );
    expect(
      screen.getByText(`Enabler(s): ${expectedMockEnabler.firstName}`)
    ).toBeInTheDocument();
  });
});
