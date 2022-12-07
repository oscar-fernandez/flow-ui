import ITechnology from "./ITechnology";

export default interface IEnableeTable {
  [key: string]: any;
  id: string;
  firstName: string;
  lastName: string;
  techStack: ITechnology[];
  enablementStartDate: String;
  enablementEndDate: String;
}
