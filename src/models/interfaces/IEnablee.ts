import ITechnology from "./ITechnology";

interface IEnablee {
  employeeId: number;
  firstName: string;
  lastName: string;
  dateOfJoin: string;
  enablementStartDate: string | null;
  enablementEndDate: string | null;
  assetTag: string;
  isEmployed: boolean;
  technology: ITechnology[];
  countryCode: number;
  gradeId: number;
  communityId: number;
  employmentTypeId: number;
  podId: number | null;
  commentId: number[];
}

export default IEnablee;
