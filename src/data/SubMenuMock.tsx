export const MenuItemsList = [
  {
    name: "Flow",
  },
  {
    name: "Enablee",
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
    name: "Active Pod",
    routePath: "/pod/active",
    handleOnClick: () => null,
  },
  {
    name: "Pending Pod",
    routePath: "/pod/pending",
    handleOnClick: () => null,
  },
  {
    name: "Available Pod",
    routePath: "/pod/available",
    handleOnClick: () => null,
  },
  {
    name: "Completed Pod",
    routePath: "/pod/completed",
    handleOnClick: () => null,
  },
];
