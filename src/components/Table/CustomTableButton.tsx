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
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Button
            variant="text"
            data-testid="button"
            onClick={customHandleClick}
            sx={buttonStyle}
          >
            + Add {value === "Technology" ? "Skill" : value}
          </Button>
        </Box>
      </div>
    </>
  );
};

export default CustomTableButton;
