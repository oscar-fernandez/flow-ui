import { useState } from "react";
import "./PageViewHeader.css";

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
  handleClick?: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void;
}) {
  const [plus, setPlusClicked] = useState(props.showPlus);

  // State used to keep track of hover effect
  const [hover, setHover] = useState(false);

  // Header styling
  const headerStyling = {
    color: "#dc8d0b",
    fontWeight: "700",
    fontSize: "32px",
    lineHeight: "100%",
    letterSpacing: "0.025em",
    marginBottom: "1rem",
  };

  // Header's plus styling
  const headerPlusStyling = {
    color: "#000048",
    fontWeight: "700",
    fontSize: "42px",
    lineHeight: "100%",
    letterSpacing: "0.025em",
    cursor: "pointer",
  };

  // Non header styling (used in modals)
  const nonHeaderStyling = {
    color: "#000048",
    fontWeight: "600",
    fontSize: "22px",
    lineHeight: "100%",
    letterSpacing: "0.025em",
  };

  // Non header's plus styling (used in modals)
  const nonHeaderPlusStyling = {
    color: "#DC8D0B",
    fontWeight: "700",
    fontSize: "32px",
    lineHeight: "100%",
    letterSpacing: "0.025em",
    cursor: "pointer",
  };

  const plusClicked = () => {
    setPlusClicked(!plus);
  };

  const plusHovered = () => {
    setHover(!hover);
  };
  const plusMouseLeft = () => {
    setHover(!hover);
  };

  return (
    <div className="header-section">
      <h1 className="header">
        {props.pageTitle}{" "}
        {props.showPlus ? (
          <span className="plus" onClick={props.handleClick}>
            +
          </span>
        ) : null}
      </h1>
    </div>
  );
}
