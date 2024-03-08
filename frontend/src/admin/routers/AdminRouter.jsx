import { Navigate, Route, Routes } from "react-router-dom";
import { useAuth } from "../../redux/user/authContext";
import SignIn from "../pages/auth/SignIn";
import SignUp from "../pages/auth/SignUp";
import Home from "../pages/home/Home";

const HomeRouter = () => {
  const { auth } = useAuth();

  const PrivateRoute = ({ children }) => {
    return auth.token && auth.admin ? (
      children
    ) : (
      <Navigate to="/admin/signin" />
    );
  };

  const RedirectToHomeOrAuth = ({ children }) => {
    return auth.token && auth.admin ? (
      <Navigate to="/admin" replace />
    ) : (
      children
    );
  };

  return (
    <Routes>
      <Route
        path="/"
        element={
          <PrivateRoute>
            <Home />
          </PrivateRoute>
        }
      />
      <Route
        path="/signin"
        element={
          <RedirectToHomeOrAuth>
            <SignIn />
          </RedirectToHomeOrAuth>
        }
      />
      <Route
        path="/signup"
        element={
          <RedirectToHomeOrAuth>
            <SignUp />
          </RedirectToHomeOrAuth>
        }
      />
      <Route
        path="/*"
        element={
          <PrivateRoute>
            <Home />
          </PrivateRoute>
        }
      />
    </Routes>
  );
};

export default HomeRouter;
