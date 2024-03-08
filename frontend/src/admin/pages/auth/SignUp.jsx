import { Button, TextField } from "@mui/material";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { signUp } from "../../../redux/user/action";
import { CLEAR_USER_ERROR } from "../../../redux/user/actionType";
import { useAuth } from "../../../redux/user/authContext";
import LoadingText from "../../../shared/components/infoText/LoadingText";

const validationSchema = Yup.object({
  fullName: Yup.string()
    .required("Full Name is required")
    .min(1, "Full Name must be at least 1 character")
    .max(255, "Full Name must be at most 255 characters"),
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

const SignUp = () => {
  const { authSignIn } = useAuth();
  const isLoading = useSelector((store) => store.user.isLoading);
  const error = useSelector((store) => store.user.error);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleOnClick = () => {
    dispatch({ type: CLEAR_USER_ERROR });
  };

  const formik = useFormik({
    initialValues: {
      fullName: "",
      username: "",
      password: "",
      admin: true,
    },
    validationSchema,
    onSubmit: (values) => {
      dispatch(signUp(values, authSignIn));
    },
  });

  return (
    <div
      onClick={handleOnClick}
      className="flex min-h-screen flex-col items-center justify-center bg-gray-100"
    >
      <h1 className="my-4 text-center text-3xl font-semibold">Sign Up</h1>
      <div className="min-h-full w-[30%]  min-w-[30rem] rounded-md bg-white p-10 px-8 pb-6 shadow-md">
        <form onSubmit={formik.handleSubmit} className="space-y-4">
          <TextField
            required
            fullWidth
            label="Full Name"
            name="fullName"
            autoComplete="given-name"
            id="fullName"
            value={formik.values.fullName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.fullName && Boolean(formik.errors.fullName)}
            helperText={formik.touched.fullName && formik.errors.fullName}
          />
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
            className="w-full"
            type="submit"
            variant="contained"
            size="large"
            sx={{ padding: ".8rem 0" }}
          >
            SIGN UP
          </Button>
        </form>
        {error && (
          <div className="mt-3 text-center">
            <p className="text-red-500">{error}</p>
          </div>
        )}
        {isLoading && <LoadingText />}
        <div className="mt-5 flex items-center justify-center space-x-1">
          <p>Already have an account?</p>
          <Button
            sx={{ mt: "0.15rem" }}
            onClick={() => navigate("/admin/signin")}
          >
            SIGN IN
          </Button>
        </div>
        <div className="mt-3 text-center text-[#1976d2] ">
          <p
            onClick={() => navigate("/")}
            className="cursor-pointer hover:underline"
          >
            Switch to Customer Page
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
