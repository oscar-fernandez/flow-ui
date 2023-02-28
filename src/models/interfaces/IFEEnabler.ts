import ITechnology from "./ITechnology";

interface IFEEnabler {
  employeeId: number;
  firstName: string;
  lastName: string;
  assetTag: string;
  employed: boolean;
  technology: ITechnology[];
  city: string;
  state: string;
  country: string;
  communityId: number;
  employmentTypeId: number;
  numActivePods: number[];
  numPendingPods: number[];
}
export default IFEEnabler;
