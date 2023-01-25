import { fireEvent, render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { usePendingPodEnablees } from "../Hooks/customHook";
import PodAssignment from "./PodAssignment";
import { vi } from "vitest";
import { mockFePod } from "../../../data/MockFEPod";
import { matchAllSkills, matchData, matchSomeSkills } from "../../Pod/podUtils";
import { dummyEnablees } from "../../../data/EnableeMock";

vi.mock("../Hooks/customHook");

const receivedEnablees = [
  {
    employeeId: 0,
    firstName: "John",
    lastName: "Doe",
    dateOfJoin: "2021-12-25",
    enablementStartDate: "2021-01-21",
    enablementEndDate: "2021-01-30",
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

const filteredEnablees = [
  {
    employeeId: 977284,
    firstName: "Steve",
    lastName: "Bob",
    dateOfJoin: "2022-01-21",
    enablementStartDate: "2021-01-21",
    enablementEndDate: "2021-01-30",
    assetTag: "I Don't know",
    isEmployed: false,
    technology: [
      { id: 2, name: "Java", backgroundColor: "grey" },
      { id: 8, name: "React", backgroundColor: "blue" },
      { id: 12, name: "Rust", backgroundColor: "brown" },
      { id: 12, name: "C++", backgroundColor: "yellow" },
    ],
    countryCode: 1,
    gradeId: 1,
    communityId: 1,
    employmentTypeId: 1,
    podId: 1,
    commentId: [1, 2, 3],
  },
  {
    employeeId: 1221,
    firstName: "Jessabelle",
    lastName: "Cowringer",
    dateOfJoin: "2022-01-21",
    enablementStartDate: "2021-01-21",
    enablementEndDate: "2021-01-30",
    assetTag: "I Don't know",
    isEmployed: false,
    technology: [
      { id: 2, name: "Java", backgroundColor: "grey" },
      { id: 8, name: "React", backgroundColor: "blue" },
    ],
    countryCode: 1,
    gradeId: 1,
    communityId: 1,
    employmentTypeId: 1,
    podId: 1,
    commentId: [1, 2, 3],
  },
  {
    employeeId: 738920,
    firstName: "Ondrew",
    lastName: "Jooors",
    dateOfJoin: "2022-01-21",
    enablementStartDate: "2021-01-21",
    enablementEndDate: "2021-01-30",
    assetTag: "I Don't know",
    isEmployed: false,
    technology: [
      { id: 2, name: "Java", backgroundColor: "grey" },
      { id: 8, name: "React", backgroundColor: "blue" },
      { id: 12, name: "Rust", backgroundColor: "brown" },
      { id: 12, name: "C++", backgroundColor: "yellow" },
    ],
    countryCode: 1,
    gradeId: 1,
    communityId: 1,
    employmentTypeId: 1,
    podId: 1,
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
    //   const result = (matchData as jest.Mock).mockResolvedValue(filteredEnablees);
    expect(screen.getByText("John")).toBeInTheDocument();
  });

  it("should display increase capasity when clicked enablee row ", () => {
    (usePendingPodEnablees as jest.Mock).mockImplementation(() => {
      return { receivedEnablees };
    });

    render(<PodAssignment />);
    const selectedRow = screen.queryByText(mockFePod[0].podName);
    selectedRow && fireEvent.click(selectedRow);
    const selectedRadioButton = screen.queryByLabelText("Match Tech Stack");
    expect(selectedRadioButton).toBeInTheDocument();
    selectedRadioButton && fireEvent.click(selectedRadioButton);
    const result = matchAllSkills(dummyEnablees, mockFePod[0]);
  });
});
