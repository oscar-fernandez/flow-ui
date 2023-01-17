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
  "#698996",
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
  "#7F055F",
  "#84714F",
  "#1A936F",
  "#84714F",
  "#403F4C",
  "#4F6367",
  "#2D2D2A",
  "#48A9A6",
  "#114B5F",
];

function getRandomColor(): string {
  const randomBuffer = new Uint32Array(1);
  window.crypto.getRandomValues(randomBuffer);
  const randomNumber = randomBuffer[0] / (0xffffffff + 1);
  const min = Math.ceil(0);
  const max = Math.floor(24);
  const num = Math.floor(randomNumber * (max - min + 1)) + min;
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

const transformProjectRowArray = (ar: IProject[]): string[][] => {
  const temp = ar.map((e) => projectRowfactory(e));
  return temp;
};

const projectRowfactory = (obj: IProject): string[] => {
  return [obj.name, convertTechArToStr(obj.technology)];
};

const transformTechRowArray = (ar: ITechnology[]): string[][] =>
  ar.map((e) => techRowFactory(e));

const techRowFactory = (obj: ITechnology): string[] => {
  return [obj.name];
};

export {
  convertTechArToStr,
  transformEnableeArray,
  transformProjectRowArray,
  transformTechRowArray,
  tabLabels,
  getRandomColor,
};
