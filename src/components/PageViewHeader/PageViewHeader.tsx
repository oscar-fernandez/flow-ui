import "./PageViewHeader.css";

// This functional component can be reused to
export function PageViewHeader(props: {
  name: string | undefined;
  pageTitle: string | undefined;
  showPlus: boolean;
}) {
  return (
    <>
      <div className="signout-section">
        <p className="signout-content">
          Hi <span className="name">{props.name}</span>,<br></br>Sign out?
        </p>
      </div>
      <span className="header-section">
        <h1 className="header">
          {props.pageTitle}{" "}
          {props.showPlus ? <span className="plus">+</span> : null}
        </h1>
      </span>
    </>
  );
}
