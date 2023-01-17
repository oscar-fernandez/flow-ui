import IEnablee from "./IEnablee";
import IProject from "./IProject";

interface IPod {
  id: number;
  podName: string;
  enableeEmployee: IEnablee[];
  podStartDate: string;
  podEndDate: string;
  project: IProject;
}

export default IPod;
