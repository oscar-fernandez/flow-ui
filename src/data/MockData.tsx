import IColumns from "../models/interfaces/IColumns";
import ITechnology from "../models/interfaces/ITechnology";

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
