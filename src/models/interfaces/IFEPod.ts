import IEnablee from "./IEnablee";
import IEnabler from "./IEnabler";
import IProject from "./IProject";

interface IFEPod {
  id: number;
  podName: string;
  enablee: IEnablee[];
  enabler: IEnabler[] | null;
  podStartDate: string;
  podEndDate: string;
  project: IProject;
}

export default IFEPod;
