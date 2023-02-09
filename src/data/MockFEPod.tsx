import IFEPod from "../models/interfaces/IFEPod";
import IProject from "../models/interfaces/IProject";
import { dummyEnablees } from "./EnableeMock";
import ITechnology from "../models/interfaces/ITechnology";

const mockTech: ITechnology[] = [
  {
    id: 3,
    name: ".Net",
    backgroundColor: "brown",
  },
  {
    id: 4,
    name: "Java",
    backgroundColor: "black",
  },
  {
    id: 5,
    name: "Ruby",
    backgroundColor: "green",
  },
  {
    id: 3,
    name: "Microservices",
    backgroundColor: "white",
  },
  { id: 12, name: "Rust", backgroundColor: "brown" },
  { id: 15, name: "C++", backgroundColor: "yellow" },
];

const mockTech1: ITechnology[] = [
  {
    id: 3,
    name: "React",
    backgroundColor: "brown",
  },
];

const mockTech2: ITechnology[] = [
  {
    id: 3,
    name: "AWS",
    backgroundColor: "brown",
  },
];

const project: IProject = {
  id: 2,
  name: "Cognivision",
  summary: "",
  technology: mockTech,
  repoLink: "",
};

const project2: IProject = {
  id: 2,
  name: "NetZero",
  summary: "",
  technology: mockTech1,
  repoLink: "",
};

const project3: IProject = {
  id: 2,
  name: "Flow",
  summary: "",
  technology: mockTech2,
  repoLink: "",
};

export const mockFePod: IFEPod[] = [
  {
    id: 1,
    podName: "Crew",
    enablee: dummyEnablees,
    enabler: null,
    podStartDate: subtractDays(new Date(), 5).toString(),
    podEndDate: addDays(new Date(), 35).toString(),
    project: project,
  },
  {
    id: 2,
    podName: "Team",
    enablee: dummyEnablees,
    enabler: null,
    podStartDate: subtractDays(new Date(), 5).toString(),
    podEndDate: addDays(new Date(), 35).toString(),
    project: project2,
  },
  {
    id: 3,
    podName: "Gang",
    enablee: dummyEnablees,
    enabler: null,
    podStartDate: subtractDays(new Date(), 5).toString(),
    podEndDate: addDays(new Date(), 35).toString(),
    project: project3,
  },
];

function addDays(date: Date, days: number) {
  const copy = new Date(Number(date));
  copy.setDate(date.getDate() + days);
  return copy;
}

function subtractDays(date: Date, days: number) {
  const copy = new Date(Number(date));
  copy.setDate(date.getDate() - days);
  return copy;
}
