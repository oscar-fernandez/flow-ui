import { PageViewHeader } from "../../../components/HeaderSectionComponents/PageViewHeader/PageViewHeader";
import ManagementTabs from "../ManagementTabsComponent/ManagementTabs";

export default function ManagementView() {
  //const selectedItem = useRef({});

  return (
    <>
      <div>
        <PageViewHeader pageTitle="Management" showPlus={false} />
        <ManagementTabs />
      </div>
    </>
  );
}
