import { dummyEnablees } from "../data/EnableeMock";
import { dummyProjects } from "../data/MockApiCall";
import { describe, it, expect } from "vitest";
import {
  isEnableeValidForPod,
  updatedEnablees,
  updatedProjects,
  updatedTechnology,
  getAvailablePodTag,
  generateTags,
  getName,
} from "../utils/utilityFunctions";
import IEnableeTable from "../models/interfaces/IEnableeTable";
import IProjectTable from "../models/interfaces/IProjectTable";
import ITechnologyTable from "../models/interfaces/ITechnologyTable";
import IEnablee from "../models/interfaces/IEnablee";
import IFEPod from "../models/interfaces/IFEPod";

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
  it("Available pod, less than 15 enablee enrolled ", () => {
    const pod = createPod();
    pod.enablee[0] = createEnablee();
    const result = getAvailablePodTag(pod);
    expect(result.name).toEqual("Available");
  });
  it("pod is full, 15 enablee enrolled ", () => {
    const enablee = createEnablee();
    const pod = createPod();
    pod.enablee[0] = enablee;
    pod.enablee[1] = enablee;
    pod.enablee[2] = enablee;
    pod.enablee[3] = enablee;
    pod.enablee[4] = enablee;
    pod.enablee[5] = enablee;
    pod.enablee[6] = enablee;
    pod.enablee[7] = enablee;
    pod.enablee[8] = enablee;
    pod.enablee[9] = enablee;
    pod.enablee[10] = enablee;
    pod.enablee[11] = enablee;
    pod.enablee[12] = enablee;
    pod.enablee[13] = enablee;
    pod.enablee[14] = enablee;
    const result = getAvailablePodTag(pod);
    expect(result.name).toEqual("");
  });

  it("Active pod, start date is after current date", () => {
    const activePod = createPod();
    const enablee = createEnablee();
    activePod.enablee[0] = enablee;
    const currentDate = new Date();
    const startDate = new Date();
    const endDate = new Date();
    startDate.setDate(currentDate.getDate() - 5);
    endDate.setDate(currentDate.getDate() + 5);
    enablee.enablementStartDate = startDate.toDateString();
    enablee.enablementEndDate = endDate.toDateString();
    const result = generateTags(activePod.enablee[0]);
    expect(result.name).toEqual("Active");
  });

  it("Pending Pod, start date is before current date", () => {
    const pendingPod = createPod();
    pendingPod.podStartDate = "2024-01-22";
    const enablee = createEnablee();
    enablee.podId = 0;
    pendingPod.enablee[0] = enablee;
    const result = generateTags(pendingPod.enablee[0]);
    expect(result.name).toEqual("Pending Pod Assignment");
  });
  it("should return proper names using getName", () => {
    expect(getName("id")).toEqual("employee ID");
    expect(getName("firstName")).toEqual("first name");
    expect(getName("lastName")).toEqual("last name");
    expect(getName("techStack")).toEqual("Tech Stack");
    expect(getName("enablementStartDate")).toEqual("enablement start date");
    expect(getName("enablementEndDate")).toEqual("enablement end date");
    expect(getName("skillName")).toEqual("Skill Name");
    expect(getName("projectName")).toEqual("Project Name");
  });
});

describe("generateTags", () => {
  const enablee = dummyEnablees[0];
  it("returns a completed tag", () => {
    expect(generateTags(enablee).name).toEqual("Completed");
  });

  it("returns an active tag", () => {
    enablee.enablementEndDate = "9999-01-21";
    expect(generateTags(enablee).name).toEqual("Active");
  });

  it("returns Pending Pod Assignment", () => {
    enablee.podId = 0;
    expect(generateTags(enablee).name).toEqual("Pending Pod Assignment");
  });

  it("returns Pending Start Date", () => {
    const enablee = dummyEnablees[4];
    expect(generateTags(enablee).name).toEqual("Pending Start Date");
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
