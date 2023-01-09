import ITechnology from "./ITechnology";

interface IEnablee {
  filter(arg0: (e: any) => boolean);
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
