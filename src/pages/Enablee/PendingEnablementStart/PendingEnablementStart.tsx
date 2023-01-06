import { Filter } from "../../../components/Filter/Filter";
import "./PendingEnablementStart.css";
import { PageViewHeader } from "../../../components/HeaderSectionComponents/PageViewHeader/PageViewHeader";
import { GenerateRows } from "../../../components/GenerateRows/GenerateRows";
import PodTemplate from "../../../components/PodTemplate/PodTemplate";

export default function PendingEnablement() {
  return (
    <>
      <div className="page-section">
        <PageViewHeader
          pageTitle="Pending Enablement Start"
          showPlus={false}
          isHeader={true}
          plusClicked={false}
        />
        <Filter
          inputOne="employee id"
          inputTwo="first name"
          inputThree="last name"
          inputFour="tech stack"
        />
        <GenerateRows />
      </div>
      <PodTemplate showPodTemplate={true} />
    </>
  );
}
