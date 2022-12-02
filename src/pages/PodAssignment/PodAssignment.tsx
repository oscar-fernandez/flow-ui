import TableComponent from "../../components/Table/TableComponent";
import "./PodAssignment.css";
import { MockData, MockRows } from "../../data/MockData";
import { useRef } from "react";

export default function PodAssignment() {
  const selectedEnablees = useRef([]);

  return (
    <div className="container">
      <h1 className="page-title">Assign Enablees to Pod</h1>
      <TableComponent
        selectedItems={selectedEnablees.current}
        columns={MockData}
        rows={MockRows}
      />
      <div className="button-container">
        <button className="submit">submit</button>
      </div>
    </div>
  );
}
