import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getCart } from "../cart/action";
import { currentUser } from "./action";

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(() => {
    const storedAuth = JSON.parse(localStorage.getItem("e-commerce-auth"));
    if (storedAuth?.token) {
      axios.defaults.headers.common["Authorization"] =
        `Bearer ${storedAuth.token}`;
    }
    return {
      token: storedAuth?.token || null,
      isAdmin: storedAuth?.isAdmin || false,
    };
  });

  const dispatch = useDispatch();

  useEffect(() => {
    if (auth.token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${auth.token}`;
      dispatch(currentUser(authSignOut));
      dispatch(getCart());
    } else {
      delete axios.defaults.headers.common["Authorization"];
    }
  }, [auth, dispatch]);

  const authSignIn = (token, admin) => {
    setAuth({ token, isAdmin: admin });
    localStorage.setItem(
      "e-commerce-auth",
      JSON.stringify({ token, isAdmin: admin }),
    );
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  };

  const authSignOut = () => {
    localStorage.removeItem("e-commerce-auth");
    setAuth({ token: null, isAdmin: false });
    delete axios.defaults.headers.common["Authorization"];
  };

  return (
    <AuthContext.Provider value={{ auth, authSignIn, authSignOut }}>
      {children}
    </AuthContext.Provider>
  );
};
