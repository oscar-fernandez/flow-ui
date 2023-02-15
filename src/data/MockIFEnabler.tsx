import IFEEnabler from "../models/interfaces/IFEEnabler";

export const mockIFEnabler: IFEEnabler[] = [
  {
    employeeId: 292024,
    firstName: "John",
    lastName: "Travolta",
    assetTag: "Tag Asset",
    isEmployed: true,
    technology: [
      { id: 4, name: "Angular", backgroundColor: "green" },
      { id: 5, name: "C", backgroundColor: "blue" },
      { id: 2, name: "Java", backgroundColor: "yellow" },
    ],
    city: "Eaglewood",
    state: "New Jersey",
    country: "USA",
    communityId: 1,
    employmentTypeId: 1,
    numActivePods: [],
    numPendingPods: [1],
  },
  {
    employeeId: 295174,
    firstName: "Becky",
    lastName: "Schmitt",
    assetTag: "Tag Asset",
    isEmployed: true,
    technology: [
      { id: 2, name: "Java", backgroundColor: "yellow" },
      { id: 8, name: "React", backgroundColor: "orange" },
      { id: 12, name: "Rust", backgroundColor: "brown" },
    ],
    city: "Grosse Pointe",
    state: "Michigan",
    country: "USA",
    communityId: 1,
    employmentTypeId: 1,
    numActivePods: [],
    numPendingPods: [],
  },
  {
    employeeId: 332425,
    firstName: "Michael",
    lastName: "Bolton",
    assetTag: "Tag Asset",
    isEmployed: true,
    technology: [
      { id: 2, name: "Java", backgroundColor: "yellow" },
      { id: 8, name: "React", backgroundColor: "orange" },
      { id: 12, name: "Rust", backgroundColor: "brown" },
      { id: 12, name: "C++", backgroundColor: "pink" },
    ],
    city: "Austin",
    state: "Texas",
    country: "USA",
    communityId: 1,
    employmentTypeId: 1,
    numActivePods: [2, 3],
    numPendingPods: [1],
  },
];
