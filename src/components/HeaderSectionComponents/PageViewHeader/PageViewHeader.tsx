import {
  useToggle,
  useToggleArrow,
} from "../../../context/ToggleSideBarContext/ToggleSideBarContext";
import "./PageViewHeader.css";

// This functional component can be reused to
export function PageViewHeader(props: {
  pageTitle: string | undefined;
  showPlus: boolean;
  handleClick?: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void;
}) {
  const [toggle, changeToggle] = useToggle();
  const [toggleArrow, changeToggleArrow] = useToggleArrow();
  return (
    <div className="header-section">
      <h1 data-testid="pageHeaderTitleId" className="header">
        <p>{props.pageTitle} </p>
        {props.showPlus ? (
          <span
            className="plus"
            onClick={() => {
              changeToggle();
            }}
          >
            +
          </span>
        ) : null}
      </h1>
    </div>
  );
}
