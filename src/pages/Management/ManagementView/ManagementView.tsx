import { PageViewHeader } from "../../../components/HeaderSectionComponents/PageViewHeader/PageViewHeader";
import ManagementTabs from "../ManagementTabsComponent/ManagementTabs";

export default function ManagementView() {
  return (
    <>
      <div className="page-section">
        <PageViewHeader pageTitle="Management" showPlus={false} />
        <ManagementTabs />
      </div>
    </>
  );
}
