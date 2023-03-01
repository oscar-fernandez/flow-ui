import { PageViewHeader } from "../HeaderSectionComponents/PageViewHeader/PageViewHeader";
import {
  getPodProgressPercentage,
  PodEnableeEnablerRatio,
} from "../../utils/utilityFunctions";
import { MapContext } from "../../context/ToggleSideBarContext/ToggleSideBarContext";

/**
 * This componet is a container to display the Pods for an Enabler,
 * the component is modular and can be used for Active and Pending Pod depending on
 * what props are passed to the component
 *
 * @Props
 *  title: Will be passed to the PageViewHeader to display the title
 * infoString: Will be passed to the PageViewHeader to display when hovering over the icon
 *
 */
interface Props {
  title: string;
  infoString: string;
}
const TogglePodContainer = ({ title, infoString }: Props) => {
  return (
    <>
      {/* <PageViewHeader pageTitle={title} showplus={false}  showIcon={true} infoString={} plusClicked={} handleClick={}/> */}
    </>
  );
};
export default TogglePodContainer;
