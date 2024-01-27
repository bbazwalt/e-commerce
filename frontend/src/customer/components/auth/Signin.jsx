import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Button,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signin } from "../../../store/auth/action";
import { SIGNIN_FAILURE } from "../../../store/auth/actionType";

const Signin = ({ setIsSignin }) => {
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const auth = useSelector((store) => store.auth);
  const [error, setError] = useState(null);

  useEffect(() => {
    setError(auth.error);
  }, [auth.error]);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleSignupClick = () => {
    setIsSignin(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const userData = {
      email: data.get("email"),
      password: data.get("password"),
    };
    dispatch(signin(userData));
  };

  const handleOnClick = () => {
    setError(null);
    dispatch({ type: SIGNIN_FAILURE, payload: null });
  };

  return (
    <div onClick={handleOnClick}>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              required
              id="email"
              name="email"
              label="Email"
              fullWidth
              autoComplete="email"
            />
          </Grid>
          <Grid item xs={12}>
            <FormControl sx={{ width: "27.2rem" }} variant="outlined">
              <InputLabel required htmlFor="password">
                Password
              </InputLabel>
              <OutlinedInput
                required
                name="password"
                label="Password"
                autoComplete="password"
                id="password"
                type={showPassword ? "text" : "password"}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <Button
              className="bg-[#1976D2] w-full"
              type="submit"
              variant="contained"
              size="large"
              sx={{ padding: ".8rem 0" }}
            >
              Sign in
            </Button>
          </Grid>
        </Grid>
      </form>
      {error && (
        <div className="text-center mt-3">
          <p className="text-red-500">{error}</p>
        </div>
      )}
      <div className="flex justify-center flex-col items-center ">
        <div className="pt-3 flex items-center">
          <p>Don't have an account yet?</p>
          <Button className="ml-5 " size="small" onClick={handleSignupClick}>
            Sign up
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Signin;
