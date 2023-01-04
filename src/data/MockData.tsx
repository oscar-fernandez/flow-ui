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
    id: 3,
    name: "Spring Framework",
    backgroundColor: "silver",
  },
];

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
        backgroundColor: "brown",
      },
      {
        id: 4,
        name: "soda",
        backgroundColor: "black",
      },
      {
        id: 5,
        name: "juice",
        backgroundColor: "green",
      },
      {
        id: 3,
        name: "milk",
        backgroundColor: "white",
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
        backgroundColor: "brown",
      },
      {
        id: 4,
        name: "soda",
        backgroundColor: "black",
      },
      {
        id: 5,
        name: "juice",
        backgroundColor: "green",
      },
      {
        id: 3,
        name: "milk",
        backgroundColor: "white",
      },
    ],
  },
];
