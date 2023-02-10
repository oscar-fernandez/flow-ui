import ITechnology from "./ITechnology";

interface IEnabler {
  employeeId: number;
  firstName: string;
  lastName: string;
  assetTag: string;
  isEmployed: boolean;
  technology: ITechnology[];
  city: string;
  state: string;
  country: string;
  communityId: number;
  employmentTypeId: number;
}

export default IEnabler;
