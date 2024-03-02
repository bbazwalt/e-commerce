import { Button, Grid, TextField } from "@mui/material";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import LoadingText from "../../../shared/components/infoText/LoadingText";
import { signIn } from "../../../redux/auth/action";
import { CLEAR_AUTH_ERROR } from "../../../redux/auth/actionType";
import { useAuth } from "../../../redux/auth/authContext";

const validationSchema = Yup.object({
  username: Yup.string()
    .required("Username is required")
    .matches(
      /^[a-zA-Z][a-zA-Z0-9_.]{5,28}$/,
      "Username must start with a letter and contain only letters, numbers, underscores, or periods. It must be between 6 to 29 characters long.",
    ),
  password: Yup.string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters long")
    .max(255, "Password must not exceed 255 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).*$/,
      "Password must contain at least one uppercase letter, one lowercase letter, and one number",
    ),
});

const SignIn = ({ setIsSignIn }) => {
  const dispatch = useDispatch();
  const { authSignIn } = useAuth();

  const error = useSelector((store) => store.auth.error);
  const isLoading = useSelector((store) => store.auth.isLoading);

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema,
    onSubmit: (values) => {
      dispatch(signIn(values, authSignIn));
    },
  });

  const handleSignUpClick = () => {
    setIsSignIn(false);
  };
  const handleOnClick = () => {
    dispatch({ type: CLEAR_AUTH_ERROR });
  };

  return (
    <div onClick={handleOnClick}>
      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <div>
              <h1 className="-mt-3 mb-3 text-center text-3xl font-semibold">
                Sign In
              </h1>
            </div>
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              label="Username"
              name="username"
              autoComplete="username"
              id="username"
              variant="outlined"
              value={formik.values.username}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.username && Boolean(formik.errors.username)}
              helperText={formik.touched.username && formik.errors.username}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              label="Password"
              name="password"
              autoComplete="password"
              type="password"
              id="password"
              variant="outlined"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              className="w-full bg-[#1976D2]"
              type="submit"
              variant="contained"
              size="large"
              sx={{ padding: ".8rem 0" }}
            >
              SIGN IN
            </Button>
          </Grid>
        </Grid>
      </form>
      {error && (
        <div className="mt-3 text-center">
          <p className="text-red-500">{error}</p>
        </div>
      )}
      {isLoading && <LoadingText />}

      <div className="-mb-2 mt-4 flex items-center justify-center space-x-1">
        <p className="m-0">Don't have an account yet?</p>
        <Button
          variant="text"
          sx={{ mt: "0.15rem" }}
          onClick={handleSignUpClick}
        >
          SIGN UP
        </Button>
      </div>
    </div>
  );
};

export default SignIn;
