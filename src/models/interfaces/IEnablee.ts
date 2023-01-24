import ITechnology from "./ITechnology";

interface IEnablee {
  employeeId: number;
  firstName: string;
  lastName: string;
  dateOfJoin: string;
  enablementStartDate: string;
  enablementEndDate: string;
  assetTag: string;
  isEmployed: boolean;
  technology: ITechnology[];
  countryCode: number;
  gradeId: number;
  communityId: number;
  employmentTypeId: number;
  podId: number;
  commentId: number[];
}

export default IEnablee;
