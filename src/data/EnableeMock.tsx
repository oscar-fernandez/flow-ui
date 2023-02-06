import IEnablee from "../models/interfaces/IEnablee";
const today = new Date();
export const dummyEnablees: IEnablee[] = [
  {
    employeeId: 977284,
    firstName: "Steve",
    lastName: "Bob",
    dateOfJoin: subtractDays(today, 20).toString(),
    enablementStartDate: subtractDays(today, 20).toString(),
    enablementEndDate: addDays(today, 20).toString(),
    assetTag: "I Don't know",
    isEmployed: false,
    technology: [
      { id: 2, name: "Java", backgroundColor: "yellow" },
      { id: 8, name: "React", backgroundColor: "orange" },
      { id: 12, name: "Rust", backgroundColor: "brown" },
      { id: 12, name: "C++", backgroundColor: "pink" },
    ],
    countryCode: 1,
    gradeId: 1,
    communityId: 1,
    employmentTypeId: 1,
    podId: 1,
    commentId: [1, 2, 3],
  },
  {
    employeeId: 1221,
    firstName: "Jessabelle",
    lastName: "Cowringer",
    dateOfJoin: "2023-01-21",
    enablementStartDate: "2023-02-06",
    enablementEndDate: "2023-02-24",
    assetTag: "I Don't know",
    isEmployed: false,
    technology: [
      { id: 2, name: "Java", backgroundColor: "yellow" },
      { id: 8, name: "React", backgroundColor: "orange" },
    ],
    countryCode: 1,
    gradeId: 1,
    communityId: 1,
    employmentTypeId: 1,
    podId: 1,
    commentId: [1, 2, 3],
  },
  {
    employeeId: 738920,
    firstName: "Ondrew",
    lastName: "Jooors",
    dateOfJoin: subtractDays(today, 20).toString(),
    enablementStartDate: subtractDays(today, 10).toString(),
    enablementEndDate: addDays(today, 10).toString(),
    assetTag: "I Don't know",
    isEmployed: false,
    technology: [
      { id: 2, name: "Java", backgroundColor: "yellow" },
      { id: 8, name: "React", backgroundColor: "orange" },
    ],
    countryCode: 1,
    gradeId: 1,
    communityId: 1,
    employmentTypeId: 1,
    podId: 1,
    commentId: [1, 2, 3],
  },
  {
    employeeId: 728912,
    firstName: "Mario",
    lastName: "Bros",
    dateOfJoin: subtractDays(today, 20).toString(),
    enablementStartDate: subtractDays(today, 10).toString(),
    enablementEndDate: addDays(today, 10).toString(),
    assetTag: "I Don't know",
    isEmployed: false,
    technology: [
      { id: 2, name: "Java", backgroundColor: "yellow" },
      { id: 8, name: "React", backgroundColor: "orange" },
    ],
    countryCode: 1,
    gradeId: 1,
    communityId: 1,
    employmentTypeId: 1,
    podId: 1,
    commentId: [1, 2, 3],
  },
  {
    employeeId: 627890,
    firstName: "Super",
    lastName: "Sonic",
    dateOfJoin: subtractDays(today, 20).toString(),
    enablementStartDate: subtractDays(today, 10).toString(),
    enablementEndDate: addDays(today, 10).toString(),
    assetTag: "I Don't know",
    isEmployed: false,
    technology: [
      { id: 2, name: "Java", backgroundColor: "yellow" },
      { id: 8, name: "React", backgroundColor: "orange" },
    ],
    countryCode: 1,
    gradeId: 1,
    communityId: 1,
    employmentTypeId: 1,
    podId: 1,
    commentId: [1, 2, 3],
  },
];

function addDays(date: Date, days: number) {
  const copy = new Date(Number(date));
  copy.setDate(date.getDate() + days);
  return copy;
}

function subtractDays(date: Date, days: number) {
  const copy = new Date(Number(date));
  copy.setDate(date.getDate() - days);
  return copy;
}
