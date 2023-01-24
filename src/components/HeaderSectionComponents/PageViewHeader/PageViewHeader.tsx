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
      <h1 className="header">
        <p>{props.pageTitle} </p>
        {props.showPlus ? (
          <p
            className="plus"
            onClick={() => {
              changeToggle();
              // changeToggleArrow(true);
            }}
          >
            +
          </p>
        ) : null}
      </h1>
    </div>
  );
}
function useEffect(arg0: () => void, arg1: never[]) {
  throw new Error("Function not implemented.");
}
