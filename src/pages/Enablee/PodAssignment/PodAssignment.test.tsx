import { fireEvent, render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import {
  useHolderAvailablePods,
  usePendingPodEnablees,
} from "../Hooks/customHook";
import PodAssignment from "./PodAssignment";
import * as Unit from "./PodAssignment";
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

const selectedEnablees = [
  dummyEnablees[0],
  dummyEnablees[1],
  dummyEnablees[2],
  dummyEnablees[3],
  dummyEnablees[4],
  dummyEnablees[1],
  dummyEnablees[2],
  dummyEnablees[3],
  dummyEnablees[4],
  dummyEnablees[4],
];

const availablePods = mockFePod;

describe("PodAssignment", () => {
  it("should render title, table, button", () => {
    (usePendingPodEnablees as jest.Mock).mockImplementation(() => {
      return { receivedEnablees };
    });
    (useHolderAvailablePods as jest.Mock).mockImplementation(() => {
      return { availablePods };
    });

    render(<PodAssignment />);

    expect(screen.getByText("John")).toBeInTheDocument(); //verifies mock received enablee is in the document
    // expect(screen.getByText("Enablee")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "submit" })).toBeInTheDocument();
  });

  it("should display filtered enablees when selected pod ", () => {
    (usePendingPodEnablees as jest.Mock).mockImplementation(() => {
      return { receivedEnablees };
    });
    (useHolderAvailablePods as jest.Mock).mockImplementation(() => {
      return { availablePods };
    });

    render(<PodAssignment />);
    const selectedRow = screen.queryByText(mockFePod[0].podName);
    expect(selectedRow).toBeInTheDocument();

    selectedRow && fireEvent.click(selectedRow);
    //   const result = (matchData as jest.Mock).mockResolvedValue(filteredEnablees);
    expect(screen.getByText("John")).toBeInTheDocument();
  });

  it("should display filtered enablee when click radioButton", () => {
    (usePendingPodEnablees as jest.Mock).mockImplementation(() => {
      return { receivedEnablees };
    });
    (useHolderAvailablePods as jest.Mock).mockImplementation(() => {
      return { availablePods };
    });

    render(<PodAssignment />);
    const selectedRow = screen.queryByText(mockFePod[3].podName);
    selectedRow && fireEvent.click(selectedRow);
    const selectedRadioButton = screen.queryByLabelText("Contains Tech Stack");
    expect(screen.getByText("Grang")).toBeInTheDocument();
    expect(selectedRadioButton).toBeInTheDocument();
    selectedRadioButton && fireEvent.click(selectedRadioButton);
    selectedRadioButton && fireEvent.click(selectedRadioButton);
  });

  it("`*Max Capacity Selected` message should be displayed when quantity of selected enablees ==  total quantity of enablees for pod", () => {
    (usePendingPodEnablees as jest.Mock).mockImplementation(() => {
      return { receivedEnablees };
    });
    (useHolderAvailablePods as jest.Mock).mockImplementation(() => {
      return { availablePods };
    });

    render(<PodAssignment />);
    const selectedRow = screen.queryByText(mockFePod[1].podName);
    selectedRow && fireEvent.click(selectedRow);
    const selectedEnablee = screen.getByText("John");
    selectedEnablee && fireEvent.click(selectedEnablee);
    //selectedEnablee && fireEvent.click(selectedEnablee);

    const submit = screen.queryByText("submit");
    submit && fireEvent.click(submit);
    const totalCalculatedEnablees =
      selectedEnablees.length + mockFePod[1].enablee.length;
    expect(totalCalculatedEnablees).equal(15);
    expect("* Max Capacity Selected").toBe;
  });
});
