import { Button } from "@mui/material";

interface Props {
  text: string;
  handleClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export default function AlertButton({ text, handleClick }: Props) {
  return (
    <>
      <Button
        variant="contained"
        onClick={handleClick || undefined}
        sx={{
          backgroundColor: "#DC8D0B",
          fontFamily: "Darker Grotesque",
          fontWeight: 700,
          fontSize: "15px",
          letterSpacing: "0.025em",
          padding: ".5rem 1rem",
          textTransform: "none",
          marginLeft: "1rem",
          "&:hover": {
            color: "##F8E8CE",
            backgroundColor: "#DC8D0B",
          },
        }}
      >
        {text}
      </Button>
    </>
  );
}
