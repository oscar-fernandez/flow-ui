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

let subMenuItemsArr: Array<{ name: string; routePath: string }>;
let subMenuItemName: string;

/**
 * Exportable function that is used inside of SideBarItems component
 * which can be used to add the subMenuItems to the SideBarItems component.
 * @param subMenuItems an array that contains the name of item and the route
 * @returns subMenuItems array used to transport to other components
 */
export const setSubMenuItems = (
  subMenuItems: Array<{ name: string; routePath: string }>,
  subMenuItem: string
) => {
  subMenuItemsArr = subMenuItems;
  subMenuItemName = subMenuItem;
};

/**
 * Exportable function that is used inside of SideBarItems component
 * which can be used to add the subMenuItems to the SideBarItems component.
 * @param subMenuItems an array that contains the name of item and the route
 * @returns subMenuItems array used to transport to other components
 */
export const getSubMenuItems = () => {
  return subMenuItemsArr;
};

export const getSubMenuItemSelected = () => {
  return subMenuItemName;
};

/**
 * Exportable function that is used inside of SideBarItems component
 * to expand the SideBarItems if a subMenuItem is clicked. This function
 * is updated inside of OnHoverMenuItems component.
 * @param isClicked boolean
 * @returns boolean value
 */
export const setIsSubMenuItemsClicked = (isClicked: boolean) => {
  return isClicked;
};

export const isEnableeValidForPod = (fepod: IFEPod, enablee: IEnablee) => {
  const startDateFePod = new Date(fepod.podStartDate);
  const endDateFePod = new Date(fepod.podEndDate);
  const startDateEnablee = new Date(enablee.enablementStartDate);
  const endDateEnablee = new Date(enablee.enablementEndDate);
  const isDateRangeValid =
    endDateFePod.getTime() - startDateFePod.getTime() >=
    endDateEnablee.getTime() - startDateEnablee.getTime();
  return (
    (isDateRangeValid &&
      startDateFePod.getTime() >= startDateEnablee.getTime()) ||
    endDateFePod.getTime() >= endDateEnablee.getTime()
  );
};
