import {
  useToggle,
  useToggleDetail,
  useToggleTemplate,
} from "../../../context/ToggleSideBarContext/ToggleSideBarContext";
import "./PageViewHeader.css";
import EnableeTemplate from "../../EnableeTemplate/EnableeTemplate";
import PodTemplate from "../../PodTemplate/PodTemplate";

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
  const [, setDetails] = useToggleDetail();
  const [, setTemplate] = useToggleTemplate();
  const location = useLocation();

  function getTemplate() {
    if (location.pathname.includes("pod")) return <EnableeTemplate />;
    else return <PodTemplate />;
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
