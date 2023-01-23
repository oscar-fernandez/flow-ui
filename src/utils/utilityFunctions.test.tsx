import { dummyEnablees } from "../data/EnableeMock";
import { dummyProjects } from "../data/MockApiCall";
import { describe, it, expect } from "vitest";
import {
  isEnableeValidForPod,
  updatedEnablees,
  updatedProjects,
  updatedTechnology,
} from "../utils/utilityFunctions";
import IEnableeTable from "../models/interfaces/IEnableeTable";
import IProjectTable from "../models/interfaces/IProjectTable";
import ITechnologyTable from "../models/interfaces/ITechnologyTable";
import IEnablee from "../models/interfaces/IEnablee";
import IFEPod from "../models/interfaces/IFEPod";
import IProject from "../models/interfaces/IProject";

describe("utilityTest", () => {
  it("map Enablees to Table Rows", () => {
    const resultingArray = updatedEnablees(dummyEnablees);
    const testingMark: IEnableeTable = {
      id: "977284",
      firstName: "Steve",
      lastName: "Bob",
      enablementStartDate: "2022-01-21",
      enablementEndDate: "2022-01-21",
      techStack: [
        { id: 2, name: "Java", backgroundColor: "grey" },
        { id: 8, name: "React", backgroundColor: "blue" },
        { id: 12, name: "Rust", backgroundColor: "brown" },
        { id: 12, name: "C++", backgroundColor: "yellow" },
      ],
    };
    expect(resultingArray[0].firstName).toEqual(testingMark.firstName);
  });
  it("map projects to Table Rows", () => {
    const resultingArray = updatedProjects(dummyProjects);
    const testingMark: IProjectTable = {
      id: "977284",
      projectName: "PixelGram",
      summary: "",
      techStack: [
        { id: 2, name: "Java", backgroundColor: "grey" },
        { id: 8, name: "React", backgroundColor: "blue" },
        { id: 12, name: "Rust", backgroundColor: "brown" },
        { id: 12, name: "C++", backgroundColor: "yellow" },
      ],
      repoLink: "google.com",
    };
    expect(resultingArray[0].projectName).toEqual(testingMark.projectName);
  });
  it("map technologies to Table Rows", () => {
    const mockTechnologies = [
      { id: 2, name: "Java", backgroundColor: "grey" },
      { id: 8, name: "React", backgroundColor: "blue" },
      { id: 12, name: "Rust", backgroundColor: "brown" },
      { id: 12, name: "C++", backgroundColor: "yellow" },
    ];
    const resultingArray = updatedTechnology(mockTechnologies);
    const testingMark: ITechnologyTable = {
      id: "2",
      skillName: "Java",
      backgroundColor: "grey",
    };
    expect(resultingArray[0].skillName).toEqual(testingMark.skillName);
  });
  it("Enablee is valid to join pod", () => {
    const result = isEnableeValidForPod(
      createPod(),
      createEnablee().enablementStartDate,
      createEnablee().enablementEndDate
    );
    expect(result).toBe(true);
  });

  it("Invalid enablee, start date is too late and end date is too late", () => {
    const lateEnablee = createEnablee();
    lateEnablee.enablementStartDate = "2021-01-22";
    lateEnablee.enablementEndDate = "2022-06-22";
    const result = isEnableeValidForPod(
      createPod(),
      lateEnablee.enablementStartDate,
      lateEnablee.enablementEndDate
    );
    expect(result).toBe(false);
  });

  it("Invalid enablee, range is longer than pod range ", () => {
    const lateEnablee = createEnablee();
    lateEnablee.enablementEndDate = "2023-01-20";
    const result = isEnableeValidForPod(
      createPod(),
      lateEnablee.enablementStartDate,
      lateEnablee.enablementEndDate
    );
    expect(result).toBe(false);
  });
});

const createPod = (): IFEPod => {
  return {
    id: 1,
    podName: "podCrew",
    podStartDate: "2021-01-21",
    podEndDate: "2022-05-21",
    enablee: [],
    enabler: null,
    project: { id: 1, name: "foo", summary: "", technology: [], repoLink: "" },
  };
};

const createEnablee = (): IEnablee => {
  return {
    employeeId: 1,
    firstName: "Steve",
    lastName: "Bob",
    dateOfJoin: "1950-01-21",
    enablementStartDate: "2021-01-21",
    enablementEndDate: "2022-05-21",
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
  };
};
