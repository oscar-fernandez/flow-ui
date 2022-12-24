const TableRow = ({ rows }: { rows: Array<string> }) => {
  return (
    <div data-testid="table-row">
      {rows.map((h) => {
        return (
          <div data-testid={h} key={h}>
            {h}
          </div>
        );
      })}
    </div>
  );
};

export default TableRow;
