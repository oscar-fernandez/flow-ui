import { Button } from "@mui/material";

export default function AlertButton(props: any) {
  return (
    <>
      <Button
        variant="contained"
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
        {props.text}
      </Button>
    </>
  );
}
