import { Button, TextField } from "@mui/material";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { signIn } from "../../../redux/user/action";
import { CLEAR_USER_ERROR } from "../../../redux/user/actionType";
import { useAuth } from "../../../redux/user/authContext";
import LoadingText from "../../../shared/components/infoText/LoadingText";

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

const SignIn = () => {
  const [error, setError] = useState(null);

  const user = useSelector((store) => store.user.user);
  const isLoading = useSelector((store) => store.user.isLoading);
  const authError = useSelector((store) => store.user.error);

  const { authSignIn } = useAuth();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (user && !user?.admin) {
      setError("You are not an admin.");
    } else {
      setError(authError);
    }
  }, [authError, user]);

  const handleOnClick = () => {
    setError(null);
    dispatch({ type: CLEAR_USER_ERROR });
  };

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

  return (
    <div
      onClick={handleOnClick}
      className="flex min-h-screen flex-col items-center justify-center bg-gray-100"
    >
      <h1 className="my-4 text-center text-3xl font-semibold">Sign In</h1>
      <div className=" min-h-full w-[30rem] rounded-md bg-white  px-8 pb-8 pt-10 shadow-md">
        <form onSubmit={formik.handleSubmit} className="space-y-4">
          <TextField
            required
            fullWidth
            label="Username"
            name="username"
            autoComplete="username"
            id="username"
            value={formik.values.username}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.username && Boolean(formik.errors.username)}
            helperText={formik.touched.username && formik.errors.username}
          />
          <TextField
            required
            fullWidth
            label="Password"
            name="password"
            autoComplete="password"
            type="password"
            id="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />
          <Button
            fullWidth
            type="submit"
            variant="contained"
            size="large"
            sx={{ padding: ".8rem 0" }}
          >
            SIGN IN
          </Button>
        </form>
        {error && (
          <div className="mt-3 text-center">
            <p className="text-red-500">{error}</p>
          </div>
        )}
        {isLoading && <LoadingText />}
        <div className="mt-5 flex items-center justify-center space-x-1">
          <p>Don't have an account yet?</p>
          <Button
            variant="text"
            sx={{ mt: "0.15rem" }}
            onClick={() => navigate("/admin/signup")}
          >
            SIGN UP
          </Button>
        </div>
        <div className="mt-3 text-center text-[#1976d2] ">
          <p
            onClick={() => navigate("/")}
            className="cursor-pointer  hover:underline"
          >
            Switch to Customer Page
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
