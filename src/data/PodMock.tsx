import IPod from "../models/interfaces/IPod";

export const mockPods: IPod[] = [
  {
    id: 12,
    podName: "Podz",
    enableeEmployee: [{ id: 9772 }, { id: 977284 }],
    podStartDate: "2022-01-15",
    podEndDate: "2022-06-21",
    project: {
      id: 1,
      name: "PixelGram",
      summary: "",
      technology: [
        { id: 2, name: "Java", backgroundColor: "grey" },
        { id: 8, name: "React", backgroundColor: "blue" },
        { id: 12, name: "Rust", backgroundColor: "brown" },
        { id: 12, name: "C++", backgroundColor: "yellow" },
      ],
      repoLink: "google.com",
    },
  },

  {
    id: 11,
    podName: "Pod3",
    enableeEmployee: [],
    podStartDate: "2022-01-15",
    podEndDate: "2022-06-21",
    project: {
      id: 1,
      name: "Flow",
      summary: "",
      technology: [
        { id: 2, name: "Java", backgroundColor: "grey" },
        { id: 8, name: "React", backgroundColor: "blue" },
        { id: 12, name: "Rust", backgroundColor: "brown" },
        { id: 12, name: "C++", backgroundColor: "yellow" },
      ],
      repoLink: "google.com",
    },
  },
];
