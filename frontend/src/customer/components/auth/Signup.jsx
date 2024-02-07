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
import { signup } from "../../../store/auth/action";
import { SIGNUP_FAILURE } from "../../../store/auth/actionType";

const Signup = ({ setIsSignin }) => {
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

  const handleSigninClick = () => {
    setIsSignin(true);
  };

  const handleOnClick = () => {
    setError(null);
    dispatch({ type: SIGNUP_FAILURE, payload: null });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const userData = {
      firstName: data.get("firstName"),
      lastName: data.get("lastName"),
      username: data.get("username"),
      password: data.get("password"),
    };
    dispatch(signup(userData));
  };

  return (
    <div onClick={handleOnClick}>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              className="focus:ring-0"
              required
              id="firstName"
              name="firstName"
              label="First Name"
              fullWidth
              autoComplete="given-name"
            />
            {error?.validationErrors?.firstName && (
              <div className="text-center mt-3">
                <p className="text-red-500">
                  {error.validationErrors.firstName}
                </p>
              </div>
            )}
          </Grid>

          <Grid item xs={12}>
            <TextField
              required
              id="lastName"
              name="lastName"
              label="Last Name"
              fullWidth
              autoComplete="family-name"
            />
          </Grid>
          {error?.validationErrors?.lastName && (
            <div className="text-center mt-3">
              <p className="text-red-500">{error.validationErrors.lastName}</p>
            </div>
          )}
          <Grid item xs={12}>
            <TextField
              required
              id="username"
              name="username"
              label="Username"
              fullWidth
              autoComplete="username"
            />
            {error?.validationErrors?.username && (
              <div className="text-center mt-3">
                <p className="text-red-500">
                  {error.validationErrors.username}
                </p>
              </div>
            )}
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
            {error?.validationErrors?.password && (
              <div className=" flex items-center justify-center text-center mt-3">
                <p className="text-red-500">
                  {error.validationErrors.password}
                </p>
              </div>
            )}
          </Grid>

          <Grid item xs={12}>
            <Button
              className="bg-[#1976D2] w-full"
              type="submit"
              variant="contained"
              size="large"
              sx={{ padding: ".8rem 0" }}
            >
              Sign up
            </Button>
          </Grid>
        </Grid>
      </form>
      {error?.message && (
        <div className="text-center mt-3">
          <p className="text-red-500">{error?.message}</p>
        </div>
      )}
      <div className="flex justify-center flex-col items-center ">
        <div className="pt-3 flex items-center">
          <p>Already have an account?</p>
          <Button className="ml-5 " size="small" onClick={handleSigninClick}>
            Sign in
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Signup;
