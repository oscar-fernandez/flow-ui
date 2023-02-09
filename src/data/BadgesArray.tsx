import cognivision from "../assets/badge_cognivision.png";
import flow from "../assets/badge_flow.png";
import netZero from "../assets/badge_netzero.png";
import qm from "../assets/badge_qm.png";
import IFEPod from "../models/interfaces/IFEPod";

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
  for (let i = 0; i < badgesArray.length; i++) {
    if (badgesArray[i].projectName == pod.project.name) {
      badgeIndex = i;
      i = badgesArray.length;
    }
  }
  return badgeIndex;
}
