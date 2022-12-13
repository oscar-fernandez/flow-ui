import IColumns from "../models/interfaces/IColumns";
import ITechnology from "../models/interfaces/ITechnology";

interface thing {
  id: number;
  name: string;
  techStack: ITechnology[];
}

export const MockData: IColumns = {
  topics: ["id", "name", "teckStack"],
};
export const MockRows: thing[] = [
  {
    id: 1,
    name: "what",
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
    name: "when",
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
