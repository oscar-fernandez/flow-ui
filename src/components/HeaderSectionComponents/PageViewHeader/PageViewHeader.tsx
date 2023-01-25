import "./PageViewHeader.css";

// This functional component can be reused to
export function PageViewHeader(props: {
  pageTitle: string | undefined;
  showPlus: boolean;
  handleClick?: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void;
}) {
  return (
    <div className="header-section">
      <h1 data-testid="pageHeaderTitleId" className="header">
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
