import "./LoginComponent.css";

// This functional component can be reused to
export function LoginComponent(props: { name: string | undefined }) {
  return (
    <>
      <div className="signout-section">
        <p className="signout-content">
          Hi <span className="name">{props.name}</span>,<br></br>Sign out?
        </p>
      </div>
    </>
  );
}
