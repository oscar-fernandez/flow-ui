import IColumns from "../models/interfaces/IColumns";
import ITechnology from "../models/interfaces/ITechnology";


export const mockTechnology : ITechnology[] = [
    {
      id: 3,
      name: "Java",
    },
    {
      id: 4,
      name: "React",
    },
    {
      id: 5,
      name: "Ruby",
    },
    {
      id: 3,
      name: "Spring Framework",
    },
  ]

interface thing {
  [key: string]: any;
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
    projectName: "what",
    techStack: [
      {
        id: 3,
        name: "coffee",
      },
      {
        id: 4,
        name: "soda",
      },
      {
        id: 5,
        name: "juice",
      },
      {
        id: 3,
        name: "milk",
      },
    ],
  },
  {
    id: 2,
    projectName: "when",
    techStack: [
      {
        id: 3,
        name: "coffee",
      },
      {
        id: 4,
        name: "soda",
      },
      {
        id: 5,
        name: "juice",
      },
      {
        id: 3,
        name: "milk",
      },
    ],
  },
];
