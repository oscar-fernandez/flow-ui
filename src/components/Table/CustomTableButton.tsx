import { Box, Button } from "@mui/material";

interface Props {
  buttonStyle: any;
  customHandleClick?: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void;
  value: string;
}

const CustomTableButton = ({
  buttonStyle,
  customHandleClick,
  value,
}: Props) => {
  return (
    <>
      <div style={{ backgroundColor: "#E6E8E6" }}>
        <Button
          variant="text"
          data-testid="button"
          onClick={customHandleClick}
          sx={buttonStyle}
        >
          <p>
            <span style={{ fontSize: "20px" }}>+ </span>Add{" "}
            {value === "Technology" ? "Skill" : value}
          </p>
        </Button>
      </div>
    </>
  );
};

export default CustomTableButton;
