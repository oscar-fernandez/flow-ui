import IFEPod from "../models/interfaces/IFEPod";
import IEnabler from "../models/interfaces/IEnabler";
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
    name: "React",
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

const project: IProject = {
  id: 2,
  name: "Flow",
  summary: "",
  technology: mockTech,
  repoLink: "",
};

const mockEnabler: IEnabler[] = [
  {
    employeeId: 3,
    firstName: "John",
    lastName: "Smith",
    assetTag: "I do not know",
    isActive: true,
    technology: mockTech,
    countryCode: 20,
    communityId: 65,
    employmentTypeId: 4,
    podId: [],
  },
];

export const mockFePod: IFEPod[] = [
  {
    id: 3,
    podName: "Crew",
    enablee: dummyEnablees,
    enabler: mockEnabler,
    podStartDate: new Date(),
    podEndDate: new Date(),
    project: project,
  },
];
