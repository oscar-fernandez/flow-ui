import { dummyEnablees } from "../data/EnableeMock";
import { describe, it, expect } from "vitest";
import { updatedEnablees } from "../utils/utilityFunctions";
import IEnableeTable from "../models/interfaces/IEnableeTable";
describe("updateEnableesTest", () => {
  it("map Enablees to Table Rows", () => {
    const resultingArray = updatedEnablees(dummyEnablees);
    const testingMark: IEnableeTable = {
      id: "977284",
      firstName: "Steve",
      lastName: "Bob",
      enablementStartDate: "2022-01-21",
      enablementEndDate: "2022-01-21",
      techStack: [
        { id: 2, name: "Java" },
        { id: 8, name: "React" },
        { id: 12, name: "Rust" },
        { id: 12, name: "C++" },
      ],
    };
    expect(resultingArray[0].firstName).toEqual(testingMark.firstName);
  });
});
