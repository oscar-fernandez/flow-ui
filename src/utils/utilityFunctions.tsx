import IDisplayTag from "../models/interfaces/IDisplayTag";
import IEnablee from "../models/interfaces/IEnablee";
import IEnableeTable from "../models/interfaces/IEnableeTable";
import IFEPod from "../models/interfaces/IFEPod";
import IProject from "../models/interfaces/IProject";
import IProjectTable from "../models/interfaces/IProjectTable";
import ITechnology from "../models/interfaces/ITechnology";
import ITechnologyTable from "../models/interfaces/ITechnologyTable";
import { Location } from "react-router-dom";

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
  const startDateFePod = new Date(podStartDate);
  const endDateFePod = new Date(podEndDate);
  const startDateEnablee = new Date(startDate);
  const endDateEnablee = new Date(endDate);
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
  const startDate = new Date(enablee.enablementStartDate);
  const endDate = new Date(enablee.enablementEndDate);
  const currentDate = new Date();
  let podTag: IDisplayTag = { name: "", color: "" };
  if (currentDate < endDate && currentDate >= startDate && enablee.podId > 0) {
    podTag = { name: "Active", color: "rgba(230, 57, 70, 1)" };
  } else if (enablee.podId == null || enablee.podId == 0) {
    podTag = { name: "Pending Pod Assignment", color: "rgba(52, 78, 65, 1)" };
  } else if (currentDate > endDate && enablee.podId > 0) {
    podTag = { name: "Completed", color: "rgba(99, 56, 133, 1)" };
  } else if (
    enablee.enablementStartDate === null ||
    enablee.enablementStartDate === ""
  ) {
    podTag = { name: "Pending Start Date", color: "rgba(62, 143, 114, 1)" };
  }
  return podTag;
};

// export const convertLocationToString = (location: Location) => {
//   console.log("inside converter, getting location path: ", location)
//   if(location.pathname === "/pod/active") {
//     return "Active"
//   }
//   return "Unknown"
//   // switch (location) {
//   //   case '/pod/active':
//   //     return "Active";
//   //   case '/pod/completed':
//   //     return "Completed";
//   //   case '/pod/pending':
//   //     return "Pending";
//   //   case '/pod/available':
//   //     return "Available";
//   //   case '/':
//   //     return "unknown";
//   //   default:
//   //     return "default";
//   // }
// };
