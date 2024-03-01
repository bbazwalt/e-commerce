import { Box, Modal } from "@mui/material";
import SignIn from "./SignIn";
import SignUp from "./SignUp";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  outline: "none",
  boxShadow: 24,
  p: 4,
};

const AuthModal = ({ handleAuthClose, setIsSignIn, isSignIn, openAuth }) => {
  return (
    <div>
      <Modal
        open={openAuth}
        onClose={handleAuthClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {isSignIn ? (
            <SignIn
              handleAuthClose={handleAuthClose}
              setIsSignIn={setIsSignIn}
            />
          ) : (
            <SignUp
              handleAuthClose={handleAuthClose}
              setIsSignIn={setIsSignIn}
            />
          )}
        </Box>
      </Modal>
    </div>
  );
};

export default AuthModal;
