import { dummyEnablees } from "../../data/EnableeMock";
import { mockFePod } from "../../data/MockFEPod";
import * as Utility from "./podUtils";
import { describe, it, expect } from "vitest";
import IEnablee from "../../models/interfaces/IEnablee";
import IFEPod from "../../models/interfaces/IFEPod";

describe("utility", () => {
  // it("should filtered value  by techstack", () => {
  //   const result = Utility.matchSomeSkills(dummyEnablees, mockFePod[0]);
  //   expect(result).toEqual([dummyEnablees[0]]);
  // });

  it("should filtered value  by techstack", () => {
    const result = Utility.matchAllSkills(dummyEnablees, mockFePod[0]);
    expect(result).toEqual([]);
  });

  it("should filtered value by startDate and endDate", () => {
    const enablee = createEnablee();
    const thisDate = new Date();
    const newDate = addDays(thisDate, 10);
    const oldDate = subtractDays(thisDate, 10);
    const enabarr = [enablee];
    const pod = createPod();
    pod.enablee = enabarr;
    enablee.enablementStartDate = oldDate.toString();
    enablee.enablementEndDate = newDate.toString();
    const result = Utility.matchData(enabarr, pod);
    expect(result).toEqual([enablee]);
  });

  const createPod = (): IFEPod => {
    const thisDate = new Date();
    return {
      id: 1,
      podName: "podCrew",
      podStartDate: thisDate.toString(),
      podEndDate: addDays(thisDate, 30).toString(),
      enablee: [],
      enabler: null,
      project: {
        id: 1,
        name: "foo",
        summary: "",
        technology: [],
        repoLink: "",
      },
    };
  };

  const createEnablee = (): IEnablee => {
    const thisDate = new Date();
    const newDate = addDays(thisDate, 5);
    return {
      employeeId: 1,
      firstName: "Steve",
      lastName: "Bob",
      dateOfJoin: Date.now().toString(),
      enablementStartDate: Date.now().toString(),
      enablementEndDate: newDate.toString(),
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

  function addDays(date: Date, days: number) {
    const copy = new Date(Number(date));
    copy.setDate(date.getDate() + days);
    return copy;
  }

  function subtractDays(date: Date, days: number) {
    const copy = new Date(Number(date));
    copy.setDate(date.getDate() - days);
    return copy;
  }
});
