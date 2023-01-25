import { fireEvent, render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { usePendingPodEnablees } from "../Hooks/customHook";
import PodAssignment from "./PodAssignment";
import { vi } from "vitest";
import { mockFePod } from "../../../data/MockFEPod";
import { matchSomeSkills } from "../../Pod/podUtils";
import { dummyEnablees } from "../../../data/EnableeMock";

vi.mock("../Hooks/customHook");

const receivedEnablees = [
  {
    employeeId: 0,
    firstName: "John",
    lastName: "Doe",
    dateOfJoin: "2021-12-25",
    enablementStartDate: "2022-01-01",
    enablementEndDate: "2022-04-01",
    assetTag: "N/A",
    isEmployed: true,
    technology: [
      {
        id: 1,
        name: "React",
      },
    ],
    countryCode: 200,
    gradeId: 10,
    communityId: 13,
    employementTypeId: 1,
    podId: 24,
    commentId: [1, 2, 3],
  },
];

describe("PodAssignment", () => {
  it("should render title, table, button", () => {
    (usePendingPodEnablees as jest.Mock).mockImplementation(() => {
      return { receivedEnablees };
    });

    render(<PodAssignment />);

    expect(screen.getByText("John")).toBeInTheDocument(); //verifies mock received enablee is in the document
    expect(screen.getByText("Enablee")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "submit" })).toBeInTheDocument();
  });

  it("should display filtered enablees when selected pod ", () => {
    (usePendingPodEnablees as jest.Mock).mockImplementation(() => {
      return { receivedEnablees };
    });

    render(<PodAssignment />);
    const selectedRow = screen.queryByText(mockFePod[0].podName);
    expect(selectedRow).toBeInTheDocument();

    selectedRow && fireEvent.click(selectedRow);
    const result = matchSomeSkills(dummyEnablees, mockFePod[0]);
    expect(result).toEqual([
      dummyEnablees[0],
      dummyEnablees[1],
      dummyEnablees[2],
      dummyEnablees[3],
      dummyEnablees[4],
    ]);
  });

  // it("should display filtered enablees when selected radioButton ", () => {
  //   (usePendingPodEnablees as jest.Mock).mockImplementation(() => {
  //     return { receivedEnablees };
  //   });

  //   render(<PodAssignment />);
  //  const selectedRow = screen.queryByText(mockFePod[0].podName);
});
