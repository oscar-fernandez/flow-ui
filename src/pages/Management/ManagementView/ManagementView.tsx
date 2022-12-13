import { PageViewHeader } from "../../../components/HeaderSectionComponents/PageViewHeader/PageViewHeader";
import ManagementTabs from "../../../components/ManagementTabsComponent/ManagementTabs";
//import TableRowComponent from "../../../components/Table/TableRowComponent/TableRowComponent";

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
