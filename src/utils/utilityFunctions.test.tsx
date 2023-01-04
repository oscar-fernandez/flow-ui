import { dummyEnablees } from "../data/EnableeMock";
import { dummyProjects } from "../data/MockApiCall";
import { describe, it, expect } from "vitest";
import {
  updatedEnablees,
  updatedProjects,
  updatedTechnology,
} from "../utils/utilityFunctions";
import IEnableeTable from "../models/interfaces/IEnableeTable";
import IProjectTable from "../models/interfaces/IProjectTable";
import ITechnologyTable from "../models/interfaces/ITechnologyTable";

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
});
