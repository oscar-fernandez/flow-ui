import { PageViewHeader } from "../../../components/HeaderSectionComponents/PageViewHeader/PageViewHeader";
import ManagementTabs from "../ManagementTabsComponent/ManagementTabs";

export default function ManagementView() {
  return (
    <>
      <div>
        <PageViewHeader pageTitle="Management" showPlus={false} />
        {/* TODO: include Filter Component */}
        <ManagementTabs />
        {/* Table View */}
      </div>
    </>
  );
}
