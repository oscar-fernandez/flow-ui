import IEnablee from "../../models/interfaces/IEnablee";
import IProject from "../../models/interfaces/IProject";
import ITechnology from "../../models/interfaces/ITechnology";
import { convertToStringArr } from "../../utils/utilityFunctions";

const tabLabels = ["Projects", "Technology", "Grade", "Country", "Community"];

const techStackColors = [
  "#007C77",
  "#4C1A57",
  "#084B83",
  "#885053",
  "#94C9A9",
  "#4E4D5C",
  "#805E73",
  "#243B4A",
  "#AA1155",
  "#355070",
  "#E56B6F",
  "#3066BE",
  "#5A7D7C",
  "#6D5A72",
  "#464D77",
  "#36827F",
  "#F9DB6D",
  "#E6AF2E",
  "#1A936F",
  "#88D498",
  "#403F4C",
  "#4F6367",
  "#2D2D2A",
  "#86CD82",
  "#114B5F",
];

function getRandomColor(): string {
  const num = Math.floor(Math.random() * (24 - 0 + 1) + 0);
  return techStackColors[num];
}

function convertTechArToStr(ar: ITechnology[]): string {
  return convertToStringArr(ar).join(", ");
}

const transformEnableeArray = (ar: IEnablee[]): string[][] =>
  ar.map((e) => enableeRowfactory(e));

const enableeRowfactory = (obj: IEnablee): string[] => {
  return [
    obj.employeeId.toString(),
    obj.firstName,
    obj.lastName,
    convertTechArToStr(obj.technology),
    obj.enablementStartDate,
    obj.enablementEndDate,
  ];
};

const transformProjectRowArray = (ar: IProject[]): string[][] =>
  ar.map((e) => projectRowfactory(e));

const projectRowfactory = (obj: IProject): string[] => {
  return [obj.name, convertTechArToStr(obj.technology)];
};

const transformTechRowArray = (ar: ITechnology[]): string[][] =>
  ar.map((e) => techRowFactory(e));

const techRowFactory = (obj: ITechnology): string[] => {
  return [obj.name];
};

export {
  transformEnableeArray,
  transformProjectRowArray,
  transformTechRowArray,
  tabLabels,
  getRandomColor,
};
