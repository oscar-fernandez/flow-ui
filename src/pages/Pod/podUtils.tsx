import { convertTechArToStr } from "../Management/mgtUtils";
import IEnablee from "../../models/interfaces/IEnablee";
import IFEPod from "../../models/interfaces/IFEPod";
import { isEnableeValidForPod } from "../../utils/utilityFunctions";
import { dummyEnablees } from "../../data/EnableeMock";
import { mockFePod } from "../../data/MockFEPod";

const listCheckboxes = [
  { name: "Match Tech Stack" },
  { name: "Contains Tech Stack" },
  { name: "Available Enablees" },
];

const podRowFactory = (obj: IFEPod, totalCapacity: number): string[] => {
  return [
    obj.project.name,
    obj.podName,
    convertTechArToStr(obj.project.technology),
    obj.podStartDate,
    obj.podEndDate,
    capasityEmployee(obj.enablee, totalCapacity),
  ];
};
const transformPodArray = (ar: IFEPod[], totalCapacity: number): string[][] =>
  ar.map((e) => podRowFactory(e, totalCapacity));

const ARGUMENT = 15;

const capasityEmployee = (ar: IEnablee[], totalCapacity: number) =>
  ` ${totalCapacity} / ${ARGUMENT}`;

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

export {
  matchData,
  transformPodArray,
  matchAllSkills,
  matchSomeSkills,
  listCheckboxes,
  capasityEmployee,
};
