/** [ ] will be used by nested route pendingPodAssignment
 * [ ] props are fn for custom hook for enablee, fn for custom hook pods
 * [ ] contains internal state of filtered items
 * [ ] Uses customTableContainer for enablee info, and one for Pod
 * [ ] create helper functions and put in separate utils file
 * [ ] You select a Pod, it filters the enablees. Use utility function for client side filtering. Depends on #120
 * [ ] If check mark for contains / match techstack, then pod ts must contain/ match enablee’s ts in addition to the date.
 * [ ] Submit button should be disabled, it becomes enabled once at least one pod and one enablee are selected.
 * [ ] When this submit, this should update the page by removing that enablee from the enablee pending pod assignment table
 * [ ] alert is displayed under the pod table if you selected the max capacity, you should not be able to select any more enablees from the table unless you unselect. When unselecting, this should remove the alert.
 * ![image](/uploads/c520a78d68a68d35d322bcf38c5ff604/image.png)
 * [ ] if pod is all filled, it can also be removed from the list of available pods */

import IPod from "../../models/interfaces/IPod";
import { convertTechArToStr } from "../Management/mgtUtils";
import * as _ from "lodash";
import IEnablee from "../../models/interfaces/IEnablee";
import { mockPods } from "../../data/PodMock";
import { dummyEnablees } from "../../data/EnableeMock";

const podRowFactory = (obj: IPod): string[] => {
  return [
    obj.project.name,
    obj.podName,
    convertTechArToStr(obj.project.technology),
    obj.podStartDate,
    obj.podEndDate,
  ];
};
const transformPodArray = (ar: IPod[]): string[][] =>
  ar.map((e) => podRowFactory(e));

const filterSkillsInPod = (obj: IPod): string =>
  obj.project.technology.map((t) => t.name).join(", ");

const filterSkillsInEnablee = (ar: IEnablee[]): string[] =>
  ar.map((t) => t.technology.map((e) => e.name).join(", "));

const matchSkills = filterSkillsInEnablee(dummyEnablees).filter(
  (s) => s.indexOf(filterSkillsInPod(mockPods[0])) === 0
);

// const filterEnableeBySkills = (ar: IEnablee[]): string[][] =>
//     ar.filter(e => filterSkill.name.includes(e.technology.map(t => t.name))).toString ;

// console.log(filterSkillsInPod(mockPods[0]));
// console.log(filterSkillsInEnablee(dummyEnablees));
// console.log(matchSkills);

export { transformPodArray };
