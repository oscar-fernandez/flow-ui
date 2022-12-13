import { PageViewHeader } from "../../../components/HeaderSectionComponents/PageViewHeader/PageViewHeader";
//import TableRowComponent from "../../../components/Table/TableRowComponent/TableRowComponent";
import { MockRows, MockData } from "../../../data/MockData";
import ManagementTableComponent from "../../../components/Table/ManagementTableComponent/ManagementTableComponent";
import { useEffect, useRef } from "react";
export default function ManagementView() {
  const selectedItem = useRef({});

  return (
    <>
      <div className="page-section">
        <PageViewHeader pageTitle="Management" showPlus={false} />
        <ManagementTableComponent
          selectedItem={selectedItem}
          rows={MockRows}
          columns={MockData}
        />
      </div>
    </>
  );
}
