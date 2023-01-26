import ITechnology from "./ITechnology";
import IFEPod from "./IFEPod";

interface IEnabler {
  employeeId: number;
  firstName: string;
  lastName: string;
  assetTag: string;
  isActive: boolean;
  technology: ITechnology[];
  countryCode: number;
  communityId: number;
  employmentTypeId: number;
  podId: IFEPod[] | null;
}

export default IEnabler;
