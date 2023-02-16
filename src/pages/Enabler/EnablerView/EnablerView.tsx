import "./EnablerView.css";
import { PageViewHeader } from "../../../components/HeaderSectionComponents/PageViewHeader/PageViewHeader";
import { Outlet } from "react-router";

/**
 * This component is rendered as the parent route "/enabler"
 * @returns enabler view
 */
export default function EnablerView() {
  return (
    <>
      <div className="page-section">
        <PageViewHeader
          pageTitle="Enablers"
          showPlus={true}
          isHeader={true}
          plusClicked={false}
        />
      </div>
      <Outlet />
    </>
  );
}
