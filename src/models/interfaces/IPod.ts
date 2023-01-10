import IEnablee from "./IEnablee";
import IProject from "./IProject";

interface IPod {
  id: number;
  podName: string;
  enablee: IEnablee[];
  enabler: any[];
  podStartDate: string;
  podEndDate: string;
  project: IProject;
}

export default IPod;
