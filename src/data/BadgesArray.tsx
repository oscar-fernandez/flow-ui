import IFEPod from "../models/interfaces/IFEPod";
import cognivision from "/badge_cognivision.png";
import flow from "../assets/badge_flow.png";
import netZero from "../assets/badge_netzero.png";
import qm from "../assets/badge_qm.png";

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

export function pickBadgePicture(pod: IFEPod, badgeIndex: number) {
  badgesArray.map((badge, i) => {
    if (badge.projectName == pod.project.name) {
      badgeIndex = i;
    }
  });
  return badgeIndex;
}
