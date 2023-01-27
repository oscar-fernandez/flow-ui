import { convertTechArToStr } from "../Management/mgtUtils";
import IEnablee from "../../models/interfaces/IEnablee";
import IFEPod from "../../models/interfaces/IFEPod";
import { isEnableeValidForPod } from "../../utils/utilityFunctions";
import { dummyEnablees } from "../../data/EnableeMock";
import { mockFePod } from "../../data/MockFEPod";

const listCheckboxes = [
  { name: "Match Tech Stack" },
  { name: "Contains Tech Stack" },
];

const podRowFactory = (
  obj: IFEPod,
  selectedRowId: number | undefined,
  selectedCapacity: number
): string[] => {
  if (obj.id != selectedRowId) {
    selectedCapacity = 0;
  }

  return [
    obj.podName,
    obj.project.name,
    convertTechArToStr(obj.project.technology),
    convertStringDateToLocalFormat(obj.podStartDate),
    convertStringDateToLocalFormat(obj.podEndDate),
    capasityEmployee(obj.enablee, selectedCapacity),
  ];
};
const transformPodArray = (
  ar: IFEPod[],
  selectedRowId: number | undefined,
  selectedCapacity: number
): string[][] =>
  ar.map((e) => podRowFactory(e, selectedRowId, selectedCapacity));

const PLACEHOLDER = 15;

const capasityEmployee = (ar: IEnablee[], selectedCapacity: number) =>
  ` ${ar.length ? ar.length + selectedCapacity : "0"} / ${PLACEHOLDER}`;

const eqSet = (xs: Set<string>, ys: Set<string>) =>
  xs.size === ys.size && [...xs].every((x) => ys.has(x));

const matchAllSkills = (ar: IEnablee[], obj: IFEPod) =>
  ar.filter((e) => {
    return eqSet(
      new Set(e.technology.map((t) => t.name)),
      new Set(obj.project.technology.map((t) => t.name))
    );
  });

const includeSet = (xs: Set<string>, ys: Set<string>) =>
  [...xs].some((x) => ys.has(x));

const matchSomeSkills = (ar: IEnablee[], obj: IFEPod) =>
  ar.filter((e) => {
    return includeSet(
      new Set(e.technology.map((t) => t.name)),
      new Set(obj.project.technology.map((t) => t.name))
    );
  });

const matchData = (ar: IEnablee[], p: IFEPod) => {
  const validEnablee = [] as IEnablee[];

  ar.forEach((element) => {
    if (
      isEnableeValidForPod(
        p,
        element.enablementStartDate,
        element.enablementEndDate
      )
    ) {
      validEnablee.push(element);
    }
  });
  return validEnablee;
};

const convertStringDateToLocalFormat = (date: string) => {
  const strDate = date.split("-");
  const newdate = new Date(+strDate[0], +strDate[1] - 1, +strDate[2]);
  const strLocalDate = newdate.toLocaleDateString("en-us", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
  return strLocalDate;
};

export {
  convertStringDateToLocalFormat,
  matchData,
  transformPodArray,
  matchAllSkills,
  matchSomeSkills,
  listCheckboxes,
  capasityEmployee,
};
