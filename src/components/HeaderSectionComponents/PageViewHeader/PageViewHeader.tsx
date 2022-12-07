import "./PageViewHeader.css";

// This functional component can be reused to
export function PageViewHeader(props: {
  pageTitle: string | undefined;
  showPlus: boolean;
}) {
  return (
    <div className="header-section">
      <h1 className="header">
        {props.pageTitle}{" "}
        {props.showPlus ? <span className="plus">+</span> : null}
      </h1>
    </div>
  );
}
