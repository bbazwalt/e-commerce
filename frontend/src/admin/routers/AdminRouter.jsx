import { Navigate, Route, Routes } from "react-router-dom";
import { useAuth } from "../../redux/auth/authContext";
import Home from "../pages/home/Home";
import SignIn from "../pages/auth/SignIn";
import SignUp from "../pages/auth/SignUp";

const HomeRouter = () => {
  const { auth } = useAuth();

  const PrivateRoute = ({ children }) => {
    return auth.token && auth.isAdmin ? (
      children
    ) : (
      <Navigate to="/admin/signin" />
    );
  };

  const RedirectToHomeOrAuth = ({ children }) => {
    return auth.token && auth.isAdmin ? (
      <Navigate to="/admin" replace />
    ) : (
      children
    );
  };

  return (
    <div>
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
    </div>
  );
};

export default HomeRouter;
