import IDisplayTag from "../models/interfaces/IDisplayTag";
import IEnablee from "../models/interfaces/IEnablee";
import IEnableeTable from "../models/interfaces/IEnableeTable";
import IFEEnabler from "../models/interfaces/IFEEnabler";
import IFEPod from "../models/interfaces/IFEPod";
import IProject from "../models/interfaces/IProject";
import IProjectTable from "../models/interfaces/IProjectTable";
import ITechnology from "../models/interfaces/ITechnology";
import ITechnologyTable from "../models/interfaces/ITechnologyTable";
import PodTemplate from "../components/PodTemplate/PodTemplate";
import EnableeTemplate from "../components/EnableeTemplate/EnableeTemplate";
import EnablerTemplate from "../components/EnablerTemplate/EnablerTemplate";

import IPodRatio from "../models/interfaces/IPodRatio";

import {
  useToggle,
  useToggleSkills,
} from "../context/ToggleSideBarContext/ToggleSideBarContext";

export function getName(name: string) {
  switch (name) {
    case "id":
      return "employee ID";
    case "firstName":
      return "first name";
    case "lastName":
      return "last name";
    case "techStack":
      return "Tech Stack";
    case "enablementStartDate":
      return "enablement start date";
    case "enablementEndDate":
      return "enablement end date";
    case "skillName":
      return "Skill Name";
    case "projectName":
      return "Project Name";
  }
}

export const shortenStringList = (list: string[]): string => {
  let str = "";
  if (list.length >= 1) {
    str += list[0];
    if (list.length >= 2) {
      str += `, ${list[1]}`;
      if (list.length >= 3) str += "...";
    }
  }
  return str;
};

export const convertToStringArr = (list: ITechnology[]): string[] => {
  const stringArr: string[] = [];

  if (list !== null) {
    list.forEach((tech) => {
      stringArr.push(tech.name);
    });
  }
  return stringArr;
};

export const tooltipString = (list: string[]): string =>
  list.length > 1 ? `${list.join(", ")}` : list[0];

export const updatedEnablees = (receivedEnablees: IEnablee[]) => {
  const holdingpattern: IEnableeTable[] = receivedEnablees.map(
    (enablee: IEnablee) => {
      const updatedEnablee: IEnableeTable = {
        id: enablee.employeeId.toString(),
        firstName: enablee.firstName,
        lastName: enablee.lastName,
        techStack: enablee.technology,
        enablementStartDate: enablee.enablementStartDate,
        enablementEndDate: enablee.enablementEndDate,
      };

      return updatedEnablee;
    }
  );
  return holdingpattern;
};
export const updatedProjects = (receivedProjects: IProject[]) => {
  const holdingpattern: IProjectTable[] = receivedProjects.map(
    (project: IProject) => {
      const updatedProject: IProjectTable = {
        id: project.id.toString(),
        projectName: project.name,
        summary: project.summary,
        techStack: project.technology,
        repoLink: project.repoLink,
      };

      return updatedProject;
    }
  );
  return holdingpattern;
};

export const updatedTechnology = (receivedTechnologies: ITechnology[]) => {
  const holdingpattern: ITechnologyTable[] = receivedTechnologies.map(
    (technology: ITechnology) => {
      const updatedTechnology: ITechnologyTable = {
        id: technology.id.toString(),
        skillName: technology.name,
        backgroundColor: technology.backgroundColor,
      };

      return updatedTechnology;
    }
  );
  return holdingpattern;
};

export const isEnableeValidForPod = (
  podStartDate: string,
  podEndDate: string,
  startDate: string,
  endDate: string
) => {
  const endDateEnablee = new Date(endDate);
  if (isEnableeCompletedEnb(endDateEnablee)) {
    return false;
  }
  const startDateEnablee = new Date(startDate);
  const startDateFePod = new Date(podStartDate);
  const endDateFePod = new Date(podEndDate);
  const isPodActive =
    startDateFePod.getTime() < startDateEnablee.getTime() &&
    endDateFePod.getTime() >= endDateEnablee.getTime();
  const isDateRangeValid =
    endDateFePod.getTime() - startDateFePod.getTime() >=
    endDateEnablee.getTime() - startDateEnablee.getTime();
  return (
    isDateRangeValid &&
    (startDateFePod.getTime() >= startDateEnablee.getTime() || isPodActive)
  );
};

function isEnableeCompletedEnb(enableeEndDate: Date): boolean {
  return new Date().getTime() > enableeEndDate.getTime();
}

export const getAvailablePodTag = (pod: IFEPod): IDisplayTag => {
  const POD_SIZE = 15;
  const podTag: IDisplayTag = { name: "", color: "" };
  if (pod.enablee.length < POD_SIZE) {
    (podTag.name = "Available"), (podTag.color = "#3F88C5");
  }
  return podTag;
};

export const generatePodTags = (pod: IFEPod): IDisplayTag => {
  const startDate = new Date(pod.podStartDate);
  const endDate = new Date(pod.podEndDate);
  const currentDate = new Date();
  const podTag: IDisplayTag = { name: "", color: "" };
  if (currentDate >= startDate && currentDate <= endDate) {
    podTag.name = "Active";
    podTag.color = "rgba(230, 57, 70, 1)";
  } else if (currentDate < startDate) {
    podTag.name = "Pending Start";
    podTag.color = "rgba(52, 78, 65, 1)";
  } else {
    podTag.name = "";
    podTag.color = "";
  }
  return podTag;
};

export const generateTags = (enablee: IEnablee): IDisplayTag => {
  let startDate: Date | null = null;
  let endDate: Date | null = null;
  const currentDate = new Date();
  let podTag: IDisplayTag = { name: "", color: "" };
  if (
    enablee.enablementStartDate != null &&
    enablee.enablementEndDate != null &&
    enablee.enablementStartDate != ""
  ) {
    startDate = new Date(enablee.enablementStartDate);
    endDate = new Date(enablee.enablementEndDate);

    if (
      currentDate < endDate &&
      currentDate >= startDate &&
      enablee.podId != null &&
      enablee.podId > 0
    ) {
      podTag = { name: "Active", color: "rgba(230, 57, 70, 1)" };
    } else if (enablee.podId == null || enablee.podId == 0) {
      podTag = { name: "Pending Pod Assignment", color: "rgba(52, 78, 65, 1)" };
    } else if (currentDate > endDate && enablee.podId > 0) {
      podTag = { name: "Completed", color: "rgba(99, 56, 133, 1)" };
    } else if (enablee.podId > 0 && enablee.enablementStartDate != null) {
      podTag = { name: "Pending", color: "rgba(62, 143, 114, 1)" };
    }
  } else {
    podTag = { name: "Pending Start Date", color: "rgba(62, 143, 114, 1)" };
  }

  return podTag;
};

export const enablerAssignedPods = (
  activePods: number[],
  pendingPods: number[]
) => {
  return activePods.length + pendingPods.length;
};

export const generateEnablerTags = (
  activePods: number[],
  pendingPods: number[]
): IDisplayTag => {
  let podTag: IDisplayTag = { name: "", color: "" };
  if (activePods.length > 0) {
    podTag = { name: "Active", color: "#E63946" };
  } else if (pendingPods.length === 0) {
    podTag = { name: "Pending Pod Assignment", color: "rgba(52, 78, 65, 1)" };
  } else if (pendingPods.length > 0) {
    podTag = { name: "Pending Pod Start", color: "#3E8F72" };
  }
  return podTag;
};

export function isDateObject(incomingDate: Date | null): boolean {
  return incomingDate instanceof Date;
}

/**
 * Helper function for the useEffect to check if the object
 * passed into the context is actually an IFEPod.
 * @param object
 * @returns object
 */
export function isPod(object: any): object is IFEPod {
  return "podStartDate" in object;
}

/**
 *  Calculates the days until a Pod begins the lowest value being 1 day away
 *  @argument
 *    startDate:string
 *  @return
 *    dayDifference:number
 */
export function daysUntilPodStarts(startDate: string): string {
  const oneDay = 1000 * 60 * 60 * 24;

  const currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0);

  const officialStartDate = convertStringToDate(startDate);

  const dayDifference = Math.abs(
    Math.round(officialStartDate.valueOf() - currentDate.valueOf()) / oneDay
  );

  return dayDifference.toFixed(0);
}

export const formatDate = (date: Date | null) => {
  let dateFormat = "";
  if (date !== null) {
    const year = date.getFullYear() || "";
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    dateFormat = `${year}-${month}-${day}`;
  }
  return dateFormat;
};

// The pod need to be active pod. It return object
// with two props for enablee and enabler ratio.
export function PodEnableeEnablerRatio(activeFEPod: IFEPod | null) {
  const ratio: IPodRatio = {
    enableeRatio: activeFEPod?.enablee?.length,
    enablerRatio: activeFEPod?.enabler?.length,
  };
  return ratio;
}

// The pod need to be active pod. Function will return percentage of pod
// progress as string of whole number.
export function getPodProgressPercentage(activeFePod: IFEPod) {
  const currentDate = new Date();

  const startDate = convertStringToDate(activeFePod.podStartDate);
  const endDate = convertStringToDate(activeFePod.podEndDate);

  let wholeStrPrecent = "";

  if (startDate.getTime() <= currentDate.getTime()) {
    const precentRatio =
      ((currentDate.getTime() - startDate.getTime()) /
        (endDate.getTime() - startDate.getTime())) *
      100;
    wholeStrPrecent = Math.trunc(Math.round(precentRatio)).toString();
  }

  return wholeStrPrecent;
}
export function isIFEEnabler(object: any): object is IFEEnabler {
  if (object === null) {
    return false;
  }
  return "numActivePods" in object;
}

/**
 *
 * Takes a string formatted as YYYY-MM-DD and converts
 * it so the Date object is not one day behind
 * Sets the hours on the formatted date to be Midnight
 *
 * @param dateString
 * @returns formatedDate
 */
export const convertStringToDate = (dateString: string) => {
  const [year, month, day] = dateString.split("-");

  const formatedDate = new Date(+year, +month - 1, +day, 0, 0, 0, 0);
  return formatedDate;
};

export function getTemplateByPath(
  pathName: string,
  details: IFEEnabler | IFEPod | IEnablee | null
) {
  let toggleTemplate: JSX.Element | null = null;

  if (details) {
    if (pathName.includes("pod")) {
      toggleTemplate = <EnableeTemplate />;
    } else if (pathName.includes("enablee")) {
      toggleTemplate = <PodTemplate />;
    }
  } else {
    if (pathName.includes("pod")) {
      toggleTemplate = <PodTemplate />;
    } else if (pathName.includes("enablee")) {
      toggleTemplate = <EnableeTemplate />;
    } else if (pathName.includes("enabler")) {
      toggleTemplate = <EnablerTemplate />;
    }
  }

  return toggleTemplate;
}

/**
 *
 * This function returns the Techstack array that is shared between the enabler and the pod
 * for that row
 *
 * @param
 *  techstack:ITechnology
 *  pod:IFEPod|null
 * @returns filteredTechStack:ITechnology[]
 */
export function getSharedTechnologies(
  techstack: ITechnology[],
  pod: IFEPod | null
): ITechnology[] {
  let filteredTechStack: ITechnology[] = [];

  if (pod && isPod(pod)) {
    filteredTechStack = techstack.filter((enablerTech) => {
      return pod.project.technology.find((ptech) => {
        return enablerTech.id === ptech.id;
      });
    });
  }

  return filteredTechStack;
}

//filter function for skills as described in issue 185
// export function filterAllSkills(
//   technologies: ITechnology[],
//   allTechnologies: ITechnology[]
// ) {}

export function matchTechnologies(
  input: string,
  availableTech: ITechnology[]
): ITechnology[] {
  if (input === "") {
    return availableTech;
  }
  return availableTech.filter((tech) => {
    return tech.name.toLowerCase().startsWith(input.toLowerCase());
  });
}

/**
 *
 * @param userTechStack - the techstack of the user
 * @param allTechnologies- The full list of technologies
 * @returns A filited ITechnology that doesn't include any technolgoy in userTechStack
 *
 *
 */
export function filterAllSkills(
  userTechStack: ITechnology[],
  allTechnologies: ITechnology[]
) {
  userTechStack.forEach((technology) => {
    allTechnologies = allTechnologies.filter(
      (item) => item.id !== technology.id
    );
  });

  return allTechnologies;
}
