import { dummyEnablees } from "../../data/EnableeMock";
import { mockFePod } from "../../data/MockFEPod";
import * as Utility from "./podUtils";
import { describe, it, expect } from "vitest";

describe("utility", () => {
  // it("should filtered value  by techstack", () => {
  //   const result = Utility.matchSomeSkills(dummyEnablees, mockFePod[0]);
  //   expect(result).toEqual([
  //     dummyEnablees[0],
  //     dummyEnablees[1],

  //   ]);
  // });

  it("should filtered value  by techstack", () => {
    const result = Utility.matchAllSkills(dummyEnablees, mockFePod[0]);
    expect(result).toEqual([]);
  });

  // it("should filtered value by startDate and ednDate", () => {
  //   const result = Utility.matchData(dummyEnablees, mockFePod[0]);
  //   expect(result).toEqual([dummyEnablees[0]]);
  // });
});
