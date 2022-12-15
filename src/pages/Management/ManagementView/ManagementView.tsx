import { PageViewHeader } from "../../../components/HeaderSectionComponents/PageViewHeader/PageViewHeader";
import ManagementTabs from "../ManagementTabsComponent/ManagementTabs";

export default function ManagementView() {
  return (
    <>
      <div>
        <PageViewHeader pageTitle="Management" showPlus={false} />
        <ManagementTabs />
      </div>
    </>
  );
}
