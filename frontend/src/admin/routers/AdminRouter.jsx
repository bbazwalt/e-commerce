import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Admin from "../pages/Admin";
const AdminRouter = () => {
  const PrivateRoute = ({ children }) => {
    return localStorage.getItem("jwt") != null ? children : <Navigate to="/" />;
  };
  return (
    <div>
      <Routes>
        <Route
          path="/*"
          element={
            <PrivateRoute>
              <Admin />
            </PrivateRoute>
          }
        />
      </Routes>
    </div>
  );
};

export default AdminRouter;
