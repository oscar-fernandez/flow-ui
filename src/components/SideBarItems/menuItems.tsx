export const MenuItemsList = [
  {
    name: "Flow",
  },
  {
    name: "Enablee",
  },
  {
    name: "Enabler",
  },
  {
    name: "Management",
  },
  {
    name: "Pod",
  },
];
export const EnableeSubMenuItems = [
  {
    name: "Master List",
    routePath: "/enablee/masterList",
    handleOnClick: () => null,
  },
  {
    name: "Pending Start",
    routePath: "enablee/pendingStart",
    handleOnClick: () => null,
  },
  {
    name: "Pending Pod Assignment",
    routePath: "enablee/pendingPodAssignment",
    handleOnClick: () => null,
  },
];

export const PodSubMenuItems = [
  {
    name: "Active",
    routePath: "/pod/active",
    handleOnClick: () => null,
  },
  {
    name: "Pending",
    routePath: "/pod/pending",
    handleOnClick: () => null,
  },
  {
    name: "Available",
    routePath: "/pod/available",
    handleOnClick: () => null,
  },
  {
    name: "Completed",
    routePath: "/pod/completed",
    handleOnClick: () => null,
  },
];

export const EnablerSubMenuItems = [{}];
