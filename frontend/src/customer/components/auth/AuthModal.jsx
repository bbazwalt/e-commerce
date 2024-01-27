import { Box, Modal } from "@mui/material";
import React from "react";
import Signin from "./Signin";
import Signup from "./Signup";

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

const AuthModal = ({ handleAuthClose, setIsSignin, isSignin, openAuth }) => {
  return (
    <div>
      <Modal
        open={openAuth}
        onClose={handleAuthClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {isSignin ? (
            <Signin
              handleAuthClose={handleAuthClose}
              setIsSignin={setIsSignin}
            />
          ) : (
            <Signup
              handleAuthClose={handleAuthClose}
              setIsSignin={setIsSignin}
            />
          )}
        </Box>
      </Modal>
    </div>
  );
};

export default AuthModal;
