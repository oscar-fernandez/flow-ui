import { Filter } from "../../../components/Filter/Filter";
import "./PendingEnablementStart.css";
import { PageViewHeader } from "../../../components/HeaderSectionComponents/PageViewHeader/PageViewHeader";
import { LoginComponent } from "../../../components/HeaderSectionComponents/LoginComponent/LoginComponent";
import { GenerateRows } from "../../../components/GenerateRows/GenerateRows";

export default function PendingEnablement() {
  return (
    <>
      <LoginComponent name="ondrew" />
      <div className="page-section">
        <PageViewHeader pageTitle="Pending Enablement Start" showPlus={false} />
        <div className="filter-container">
          <Filter
            inputOne="employee id"
            inputTwo="first name"
            inputThree="last name"
            inputFour="tech stack"
          />
        </div>
        <GenerateRows />
      </div>
    </>
  );
}
