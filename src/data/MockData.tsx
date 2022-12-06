import IColumns from "../models/interfaces/IColumns";
export const MockData: IColumns = {
  topics: ["id", "description", "status"],
};
export const MockRows: any[] = [
  {
    id: "1",
    description:
      "how to handle a click on a row in a simple table using Material UI",
    status: "itsHere",
  },
  {
    id: "2",
    description: "Below is the source code of the component I'm using",
    status: "overHere",
  },
];
