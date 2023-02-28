import {
  useToggle,
  useToggleDetail,
  useToggleTemplate,
} from "../../../context/ToggleSideBarContext/ToggleSideBarContext";
import "./PageViewHeader.css";
import EnableeTemplate from "../../EnableeTemplate/EnableeTemplate";
import PodTemplate from "../../PodTemplate/PodTemplate";
import { useLocation } from "react-router";
import EnablerTemplate from "../../EnablerTemplate/EnablerTemplate";
import { getTemplateByPath } from "../../../utils/utilityFunctions";
/**
 * This functional component is a styled header that can
 * be used throughout the program.
 *
 * @param props pageTitle=String to describe title,
 * showPlus=boolean to indicate you would like the plus link,
 * isHeader=boolean to indicate if this component is going to
 * be a header or not, plusClicked=boolean to indicate if
 * the plus was clicked.
 * @returns The styled header component
 */
export function PageViewHeader(props: {
  pageTitle: string | undefined;
  showPlus: boolean;
  isHeader: boolean;
  plusClicked: boolean;
  handleClick?: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void;
}) {
  const [toggle, changeToggle] = useToggle();
  const [details, setDetails] = useToggleDetail();
  const [, setTemplate] = useToggleTemplate();
  const pathname = useLocation().pathname;

  return (
    <div className="header-section">
      <h1 data-testid="pageHeaderTitleId" className="header">
        <p>{props.pageTitle} </p>
        {props.showPlus ? (
          <span
            data-testid="plus"
            className="plus"
            onClick={() => {
              if (toggle) {
                //set empty template
                setDetails(null);
                setTemplate(getTemplateByPath(pathname, details));
              } else {
                changeToggle();
                setDetails(null);
                setTemplate(getTemplateByPath(pathname, details));
              }
            }}
          >
            +
          </span>
        ) : null}
      </h1>
    </div>
  );
}
