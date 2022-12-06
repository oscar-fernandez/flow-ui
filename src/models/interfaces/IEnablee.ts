import ITechnology from "./ITechnology";

interface IEnablee {
  employeeId: number;
  firstName: string;
  lastName: string;
  dateOfJoin: Date;
  enablementStartDate: Date;
  enablementEndDate: Date;
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
