import IFEPod from "../models/interfaces/IFEPod";
import cognivision from "/badge_cognivision.png";
import flow from "/badge_flow.png";
import netZero from "/badge_netzero.png";
import qm from "/badge_qm.png";

export const badgesArray = [
  {
    id: 0,
    projectName: "Cognivision",
    path: cognivision,
  },
  {
    id: 1,
    projectName: "Flow",
    path: flow,
  },
  {
    id: 2,
    projectName: "NetZero",
    path: netZero,
  },
  {
    id: 3,
    projectName: "QuizMonster",
    path: qm,
  },
];

export function pickBadgePicture(pod: IFEPod) {
  const badgeIndex = badgesArray.findIndex(
    (badge) => badge.projectName === pod.project.name
  );
  if (badgeIndex != -1) {
    return badgeIndex;
  }
  return -1;
}
