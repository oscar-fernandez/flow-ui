const TableHeader = ({ headers }: { headers: Array<string> }) => {
  return (
    <div data-testid="table-header">
      {headers.map((h) => {
        return (
          <div data-testid={h} key={h}>
            {h}
          </div>
        );
      })}
    </div>
  );
};

export default TableHeader;
