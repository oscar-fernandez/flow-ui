import IEnablee from "../models/interfaces/IEnablee";
import IEnableeTable from "../models/interfaces/IEnableeTable";
import IFEPod from "../models/interfaces/IFEPod";
import IProject from "../models/interfaces/IProject";
import IProjectTable from "../models/interfaces/IProjectTable";
import ITechnology from "../models/interfaces/ITechnology";
import ITechnologyTable from "../models/interfaces/ITechnologyTable";
import PodAssignment from "../pages/Enablee/PodAssignment/PodAssignment";

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
  list.forEach((tech) => {
    stringArr.push(tech.name);
  });
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
  fepod: IFEPod,
  startDate: string,
  endDate: string
) => {
  const startDateFePod = new Date(fepod.podStartDate);
  const endDateFePod = new Date(fepod.podEndDate);
  const startDateEnablee = new Date(startDate);
  const endDateEnablee = new Date(endDate);
  const isDateRangeValid =
    endDateFePod.getTime() - startDateFePod.getTime() >=
    endDateEnablee.getTime() - startDateEnablee.getTime();
  // console.log(isDateRangeValid);
  return (
    (isDateRangeValid &&
      startDateFePod.getTime() >= startDateEnablee.getTime()) ||
    endDateFePod.getTime() >= endDateEnablee.getTime()
  );
};
