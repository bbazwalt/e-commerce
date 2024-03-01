import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import { Button } from "@mui/material";

const NextButton = () => {
  return (
    <Button
      variant="contained"
      className="z-9"
      sx={{
        position: "absolute",
        top: "9.5rem",
        right: "0rem",
        transform: "rotate(90deg)",
        bgcolor: "white",
      }}
      aria-label="next"
    >
      <KeyboardArrowLeftIcon
        sx={{ transform: "rotate(90deg)", color: "black" }}
      />
    </Button>
  );
};

export default NextButton;
