import IEnablee from "./IEnablee";
import IProject from "./IProject";
import IEnabler from "./IEnabler";

interface IPod {
  id: number;
  podName: string;
  enableeEmployee: IEnablee[];
  enabler: IEnabler[] | null;
  podStartDate: string;
  podEndDate: string;
  project: IProject;
}

export default IPod;
