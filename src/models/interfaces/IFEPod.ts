import IEnablee from "./IEnablee";
import IEnabler from "./IEnabler";
import IProject from "./IProject";

interface IFEPod {
  id: number;
  podName: string;
  enablee: IEnablee[];
  enabler: IEnabler[] | null;
  podStartDate: Date;
  podEndDate: Date;
  project: IProject;
}

export default IFEPod;
