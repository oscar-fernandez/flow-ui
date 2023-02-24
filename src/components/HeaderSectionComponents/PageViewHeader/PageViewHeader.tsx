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
  const location = useLocation();

  function getTemplate() {
    const isPodPage = location.pathname.includes("pod");
    const pathName = location.pathname;

    //if detail selected
    //if on podPage then render EnableeTemplate

    if (details) {
      if (pathName.includes("pod")) {
        return <PodTemplate />;
      } else if (pathName.includes("enablee")) {
        return <EnableeTemplate />;
      } else if (pathName.includes("enabler")) {
        return <EnablerTemplate />;
      }
    } else {
      if (pathName.includes("pod")) {
        return <PodTemplate />;
      } else if (pathName.includes("enablee")) {
        return <EnableeTemplate />;
      } else if (pathName.includes("enabler")) {
        return <EnablerTemplate />;
      }
    }

    // if (details) {
    //   // return isPodPage ? <EnableeTemplate /> : <PodTemplate />;

    // } else {
    //   //no detail selected then return <PodTemplate /> if on podPage
    //   return isPodPage ? <PodTemplate /> : <EnableeTemplate />;
    // }
  }

  return (
    <div className="header-section">
      <h1 data-testid="pageHeaderTitleId" className="header">
        <p>{props.pageTitle} </p>
        {props.showPlus ? (
          <span
            className="plus"
            onClick={() => {
              if (toggle) {
                //set empty template
                setDetails(null);
                setTemplate(getTemplate());
              } else {
                changeToggle();
                setDetails(null);
                setTemplate(getTemplate());
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
