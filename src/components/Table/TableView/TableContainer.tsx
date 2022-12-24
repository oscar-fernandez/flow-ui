import TableHeader from "./TableHeader";
import TableRow from "./TableRow";

const TableContainer = ({
  headers,
  rows,
}: {
  headers: Array<string>;
  rows: Array<string>;
}) => {
  return (
    <div data-testid="table-container">
      <TableHeader headers={headers} />
      <TableRow rows={rows} />
    </div>
  );
};

export default TableContainer;
