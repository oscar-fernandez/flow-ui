import ITechnology from "./ITechnology";
import IFEPod from "./IFEPod";

interface IEnabler {
  employeeId: number;
  firstName: String;
  lastName: String;
  assetTag: String;
  isActive: boolean;
  technology: ITechnology[];
  countryCode: number;
  communityId: number;
  employmentTypeId: number;
  podId: IFEPod[];
}

export default IEnabler;
