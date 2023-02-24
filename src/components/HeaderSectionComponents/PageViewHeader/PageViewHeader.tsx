import {
  useToggle,
  useToggleDetail,
} from "../../../context/ToggleSideBarContext/ToggleSideBarContext";
import "./PageViewHeader.css";
import { Tooltip } from "@mui/material";

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
  showIcon?: boolean;
  infoString?: string;
  plusClicked: boolean;
  handleClick?: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void;
}) {
  const [toggle, changeToggle] = useToggle();
  const [details, setDetails] = useToggleDetail();
  return (
    <div className="header-section">
      <h1 data-testid="pageHeaderTitleId" className="header">
        <p>{props.pageTitle} </p>
        {props.showPlus && props.showIcon ? (
          <span
            className="plus info"
            onClick={() => {
              changeToggle();
              setDetails(null);
            }}
          >
            +{" "}
            <Tooltip title={props.infoString} placement="right-start">
              <span className="info">i</span>
            </Tooltip>
          </span>
        ) : props.showIcon ? (
          <Tooltip title={props.infoString} placement="right-start">
            <span className="info">i</span>
          </Tooltip>
        ) : (
          <span
            className="plus"
            onClick={() => {
              changeToggle();
              setDetails(null);
            }}
          >
            +
          </span>
        )}
      </h1>
    </div>
  );
}
