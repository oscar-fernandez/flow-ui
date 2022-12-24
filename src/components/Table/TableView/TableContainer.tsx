import TableHeader from "./TableHeader";

const headers = ["Project Name, Tech Stack"];

const TableContainer = () => {
  return (
    <div data-testid="table-container">
      <TableHeader headers={headers} />
    </div>
  );
};

export default TableContainer;
