import IEnablee from "../models/interfaces/IEnablee";
import IEnableeTable from "../models/interfaces/IEnableeTable";
import ITechnology from "../models/interfaces/ITechnology";

export function getName(name: string) {
  switch (name) {
    case "id":
      return "employee ID";
    case "firstName":
      return "first name";
    case "lastName":
      return "last name";
    case "techStack":
      return "tech stack";
    case "enablementStartDate":
      return "enablement start date";
    case "enablementEndDate":
      return "enablement end date";
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
