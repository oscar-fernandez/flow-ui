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
  generatePodTags,
  generateEnablerTags,
  enablerAssignedPods,
  isDateObject,
  getName,
  formatDate,
  daysUntilPodStarts,
  getTemplateByPath,
  getPodProgressPercentage,
  PodEnableeEnablerRatio,
  matchTechnologies,
  filterAllSkills,
} from "../utils/utilityFunctions";
import IEnableeTable from "../models/interfaces/IEnableeTable";
import IProjectTable from "../models/interfaces/IProjectTable";
import ITechnologyTable from "../models/interfaces/ITechnologyTable";
import IEnablee from "../models/interfaces/IEnablee";
import IFEPod from "../models/interfaces/IFEPod";
import IFEEnabler from "../models/interfaces/IFEEnabler";
import PodTemplate from "../components/PodTemplate/PodTemplate";
import EnableeTemplate from "../components/EnableeTemplate/EnableeTemplate";
import EnablerTemplate from "../components/EnablerTemplate/EnablerTemplate";
import { mockFePod } from "../data/MockFEPod";
import IPodRatio from "../models/interfaces/IPodRatio";
import {
  mockTechnology,
  secondMockTechnology,
  expectedResultForTests,
  mockSkillForEdgeCase,
} from "../data/MockData";

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

  it("allows valid enablee", () => {
    const enablee = createEnablee();
    const thisDate = new Date();
    const newDate = addDays(thisDate, 10);
    const oldDate = subtractDays(thisDate, 10);
    const pod = createPod();
    enablee.enablementStartDate = oldDate.toString();
    enablee.enablementEndDate = newDate.toString();
    const result = isEnableeValidForPod(
      pod.podStartDate,
      pod.podEndDate,
      enablee.enablementStartDate,
      enablee.enablementEndDate
    );
    expect(result).toBe(true);
  });

  it("Invalid enablee, start date is too late and end date is too late", () => {
    const lateEnablee = createEnablee();
    const thisDate = new Date();
    const newDate = addDays(thisDate, 20);
    const newerDate = addDays(newDate, 30);
    const pod = createPod();
    lateEnablee.enablementStartDate = newDate.toString();
    lateEnablee.enablementEndDate = newerDate.toString();
    const result = isEnableeValidForPod(
      pod.podStartDate,
      pod.podEndDate,
      lateEnablee.enablementStartDate,
      lateEnablee.enablementEndDate
    );
    expect(result).toBe(false);
  });

  it("Invalid enablee, range is longer than pod range ", () => {
    const lateEnablee = createEnablee();
    const thisDate = new Date();
    const newDate = addDays(thisDate, 20);
    const newerDate = addDays(newDate, 30);
    const pod = createPod();
    lateEnablee.enablementStartDate = newDate.toString();
    lateEnablee.enablementEndDate = newerDate.toString();
    const result = isEnableeValidForPod(
      pod.podStartDate,
      pod.podEndDate,
      lateEnablee.enablementStartDate,
      lateEnablee.enablementEndDate
    );
    expect(result).toBe(false);
  });

  it("isEnableeValidForPod should return false when enablee completed enablement", () => {
    const podDates = {
      podStartDate: "2023-01-01",
      podEndDate: "2023-01-20",
    };
    const enableeDates = {
      starDate: "2020-01-01",
      endDate: "2020-01-20",
    };

    const actualReturn = isEnableeValidForPod(
      podDates.podStartDate,
      podDates.podEndDate,
      enableeDates.starDate,
      enableeDates.endDate
    );

    expect(actualReturn).toBeFalsy();
  });

  // it("isEnableeValidForPod should return true when enablee endDate is same as current Date", () => {
  //   const currentDate = new Date();

  //   const podDates = {
  //     podStartDate: subtractDays(currentDate, 5).toString(),
  //     podEndDate: addDays(currentDate, 5).toString(),
  //   };

  //   const enableeDates = {
  //     starDate: podDates.podStartDate,
  //     endDate: addDays(currentDate, 0),
  //   };

  //   enableeDates.endDate.

  //   const actualReturn = isEnableeValidForPod(
  //     podDates.podStartDate,
  //     podDates.podEndDate,
  //     enableeDates.starDate,
  //     enableeDates.endDate
  //   );

  //   expect(actualReturn).toBeTruthy();
  // });

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
  it("isDateObject should return true when receiving a date Object and false for anything else", () => {
    const currentDate = new Date();
    const nullDate = null;
    expect(isDateObject(currentDate)).toBeTruthy();
    expect(isDateObject(nullDate)).toBeFalsy();
  });
  it("daysUntilPodStarts should return the days left until the pod Starts", () => {
    const currentDate = new Date();

    const startDateinTime = currentDate.setDate(currentDate.getDate() + 4);
    const startDate = new Date(startDateinTime);

    const daysLeft = daysUntilPodStarts(formatDate(startDate));

    expect(daysLeft).toBe("4");
  });
});

describe("generatePodTags", () => {
  const pod = createPod();

  it("returns no tag", () => {
    pod.podStartDate = "";
    pod.podEndDate = "";
    expect(generatePodTags(pod).name).toEqual("");
  });

  it("returns an active tag", () => {
    const currentDate = new Date();
    const startDate = new Date();
    const endDate = new Date();
    startDate.setDate(currentDate.getDate() - 5);
    endDate.setDate(currentDate.getDate() + 5);
    pod.podStartDate = startDate.toDateString();
    pod.podEndDate = endDate.toDateString();
    expect(generatePodTags(pod).name).toEqual("Active");
  });

  it("returns pending start tag", () => {
    const currentDate = new Date();
    const startDate = new Date();
    const endDate = new Date();
    startDate.setDate(currentDate.getDate() + 5);
    endDate.setDate(currentDate.getDate() + 10);
    pod.podStartDate = startDate.toDateString();
    pod.podEndDate = endDate.toDateString();
    expect(generatePodTags(pod).name).toEqual("Pending Start");
  });
});

describe("generateTags", () => {
  const enablee = createEnablee();

  it("returns a completed tag", () => {
    enablee.enablementEndDate = "2022-01-21";
    expect(generateTags(enablee).name).toEqual("Completed");
  });

  it("returns an active tag", () => {
    const day = new Date();
    enablee.enablementEndDate = addDays(day, 10).toString();
    enablee.enablementStartDate = subtractDays(day, 10).toString();
    expect(generateTags(enablee).name).toEqual("Active");
  });

  it("returns Pending Pod Assignment", () => {
    enablee.podId = 0;
    expect(generateTags(enablee).name).toEqual("Pending Pod Assignment");
  });

  it("returns Pending Start Date", () => {
    enablee.podId = 1;
    enablee.enablementStartDate = "";
    expect(generateTags(enablee).name).toEqual("Pending Start Date");
  });
  it("returns Pending", () => {
    enablee.podId = 1;
    enablee.enablementStartDate = "2024-01-21";
    expect(generateTags(enablee).name).toEqual("Pending");
  });

  it("return formated date", () => {
    const day = new Date("July 21, 2022 01:15:00");
    expect(formatDate(day)).toEqual("2022-07-21");
  });
});

describe("generateEnablerTags", () => {
  it("returns Active even when pending pods is empty", () => {
    expect(generateEnablerTags([1], []).name).toEqual("Active");
  });

  it("returns Pending Pod Start", () => {
    expect(generateEnablerTags([], [1]).name).toEqual("Pending Pod Start");
  });

  it("returns Pending Pod Assignment", () => {
    expect(generateEnablerTags([], []).name).toEqual("Pending Pod Assignment");
  });
  it("returns Active when active and pending pods are not empty", () => {
    expect(generateEnablerTags([1], [1]).name).toEqual("Active");
  });
});

describe("enablerAssignedPods", () => {
  const enabler = createEnabler();
  it("returns number of total assigned pods for an enabler", () => {
    expect(
      enablerAssignedPods(enabler.numActivePods, enabler.numPendingPods)
    ).toEqual(1);
  });
});

describe("Template tag using location", () => {
  it("return pod template component with pod in location pathname", () => {
    const podTemplate = getTemplateByPath("/pod", null);
    const enableeTemplateDetail = getTemplateByPath("/pod", createEnablee());

    expect(podTemplate).toMatchObject(<PodTemplate />);
    expect(enableeTemplateDetail).toMatchObject(<EnableeTemplate />);
  });

  it("return enablee template component with enablee in location pathname", () => {
    const enableeTemplate = getTemplateByPath("/enablee", null);
    const podTemplateDetail = getTemplateByPath("/enablee", createPod());

    expect(enableeTemplate).toMatchObject(<EnableeTemplate />);
    expect(podTemplateDetail).toMatchObject(<PodTemplate />);
  });

  it("return enableer template component with enableer in location pathname", () => {
    const enablerTemplate = getTemplateByPath("/enabler", null);

    expect(enablerTemplate).toMatchObject(<EnablerTemplate />);
  });
});

describe("enablee and enabler pod ratio test", () => {
  it("return enabler size and enable size as object", () => {
    const expectedRatio: IPodRatio = { enableeRatio: 5, enablerRatio: 1 };
    const fepods = mockFePod;
    const podRatio = PodEnableeEnablerRatio(fepods[0]);

    expect(podRatio).toEqual(expectedRatio);
  });

  it("return 0 ratio  object when enablee and enabler are empty", () => {
    const expectedRatio: IPodRatio = { enableeRatio: 0, enablerRatio: 0 };
    const fepods = mockFePod[0];
    fepods.enablee = [];
    fepods.enabler = [];
    const podRatio = PodEnableeEnablerRatio(fepods);

    expect(podRatio).toEqual(expectedRatio);
  });

  it("return undefined ratio  fir enabler when enabler is null in pod", () => {
    const expectedRatio: IPodRatio = {
      enableeRatio: 0,
      enablerRatio: undefined,
    };
    const fepods = mockFePod[0];
    fepods.enabler = null;
    const podRatio = PodEnableeEnablerRatio(fepods);

    expect(podRatio).toEqual(expectedRatio);
  });
});

/**
 * Try making getPodProgessPercentage take currentDate as a parameter
 */

describe("pod precentage progression test", () => {
  it("progression for pods ", () => {
    const fepods = mockFePod;
    const expectedPercentageLow = 28;
    const expectedPercentageHigh = 43;
    const currentDate = new Date();

    fepods[0].podStartDate = formatDate(subtractDays(currentDate, 2));
    fepods[0].podEndDate = formatDate(addDays(currentDate, 5));
    const podPercentage = getPodProgressPercentage(fepods[0]);

    expect(+podPercentage).toBeGreaterThanOrEqual(expectedPercentageLow);
    expect(+podPercentage).toBeLessThanOrEqual(expectedPercentageHigh);
  });
});

describe("matchTechnologies Tests", () => {
  it("Should return the technologies that match the user input", () => {
    const technologies = matchTechnologies("java", mockTechnology);
    expect(technologies).toEqual([mockTechnology[0]]);
  });
  it("Should return the technologies that starts with the user input", () => {
    const technologies = matchTechnologies("j", mockTechnology);
    expect(technologies).toEqual([mockTechnology[0]]);
  });
  it("Should return an empty array if no matches", () => {
    const technologies = matchTechnologies("zoo", mockTechnology);
    expect(technologies).toEqual([]);
  });
  it("Should return all technologies if user input is empty", () => {
    const technologies = matchTechnologies("", mockTechnology);
    expect(technologies).toEqual(mockTechnology);
  });
});

describe("filterAllSkillsTests", () => {
  it("return the skills from all skills not found in current assigned skills", () => {
    const skills = filterAllSkills(secondMockTechnology, mockTechnology);
    expect(skills).toEqual(expectedResultForTests);
  });
  it("Should return an empty array when someone is assigned all of the skills", () => {
    const skills = filterAllSkills(mockTechnology, mockTechnology);
    expect(skills).toEqual([]);
  });
  it("return the skills from all skills not found in current assigned skills", () => {
    const skills = filterAllSkills(mockSkillForEdgeCase, mockTechnology);
    expect(skills).toEqual(mockTechnology);
  });
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
    project: { id: 1, name: "foo", summary: "", technology: [], repoLink: "" },
  };
};

export const createEnablee = (): IEnablee => {
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

export const createEnabler = (): IFEEnabler => {
  return {
    employeeId: 292024,
    firstName: "John",
    lastName: "Travolta",
    assetTag: "Tag Asset",
    employed: true,
    technology: [
      { id: 4, name: "Angular", backgroundColor: "green" },
      { id: 5, name: "C", backgroundColor: "blue" },
      { id: 2, name: "Java", backgroundColor: "yellow" },
    ],
    city: "Chicago",
    state: "IL",
    country: "United States",
    communityId: 1,
    employmentTypeId: 1,
    numActivePods: [],
    numPendingPods: [1],
  };
};

function addDays(date: Date, days: number) {
  const copy = new Date(Number(date));
  copy.setDate(date.getDate() + days);
  return copy;
}

export function subtractDays(date: Date, days: number) {
  const copy = new Date(Number(date));
  copy.setDate(date.getDate() - days);
  return copy;
}
