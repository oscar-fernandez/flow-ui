import IColumns from "../models/interfaces/IColumns";
import ITechnology from "../models/interfaces/ITechnology";

export const mockTechnology: ITechnology[] = [
  {
    id: 3,
    name: "Java",
    backgroundColor: "grey",
  },
  {
    id: 4,
    name: "React",
    backgroundColor: "blue",
  },
  {
    id: 5,
    name: "Ruby",
    backgroundColor: "red",
  },
  {
    id: 6,
    name: "Spring Framework",
    backgroundColor: "silver",
  },
];

export const secondMockTechnology: ITechnology[] = [
  {
    id: 3,
    name: "Java",
    backgroundColor: "grey",
  },
  {
    id: 6,
    name: "Spring Framework",
    backgroundColor: "silver",
  },
];

export const expectedResultForTests: ITechnology[] = [
  {
    id: 4,
    name: "React",
    backgroundColor: "blue",
  },
  {
    id: 5,
    name: "Ruby",
    backgroundColor: "red",
  },
];

export const mockSkillForEdgeCase: ITechnology[] = [
  {
    id: 56,
    name: "Fortran",
    backgroundColor: "red",
  },
];

export interface thing {
  [key: string]: unknown;
  id: number;
  projectName: string;
  techStack: ITechnology[];
}

export const MockData: IColumns = {
  topics: ["projectName", "techStack"],
};
export const MockRows: thing[] = [
  {
    id: 1,
    projectName: "Pixelgram",
    techStack: [
      {
        id: 3,
        name: "Java",
        backgroundColor: "yellow",
      },
      {
        id: 4,
        name: "Angular",
        backgroundColor: "green",
      },
      {
        id: 5,
        name: "SpringBoot",
        backgroundColor: "blue",
      },
    ],
  },
  {
    id: 2,
    projectName: "Flow",
    techStack: [
      {
        id: 1,
        name: "TypeScript",
        backgroundColor: "red",
      },
      {
        id: 2,
        name: "React",
        backgroundColor: "orange",
      },
      {
        id: 3,
        name: "Java",
        backgroundColor: "yellow",
      },
      {
        id: 6,
        name: "MaterialUI",
        backgroundColor: "purple",
      },
    ],
  },
  {
    id: 3,
    projectName: "Quiz Monster",
    techStack: [
      {
        id: 7,
        name: "JavaScript",
        backgroundColor: "orangered",
      },
      {
        id: 2,
        name: "React",
        backgroundColor: "orange",
      },
      {
        id: 3,
        name: "Java",
        backgroundColor: "yellow",
      },
      {
        id: 8,
        name: "Bootstrap",
        backgroundColor: "aqua",
      },
    ],
  },
];
