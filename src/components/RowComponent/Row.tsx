import "./Row.css";

interface RowProps {
  children?: React.ReactNode;
  onClick: () => void;
}

const Row = ({ children, onClick }: RowProps) => {
  return (
    <>
      <div
        className="row-container"
        onClick={() => onClick()}
        data-testid="rowTest"
      >
        {children}
      </div>
    </>
  );
};

export default Row;
