import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { REQUEST_HEADER } from "../../config/apiConfig";
import { findReqUser } from "./action";

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

const setAxiosToken = (token) => {
  axios.defaults.headers.common[REQUEST_HEADER] = `Bearer ${token}`;
};

const deleteAxiosToken = () => {
  delete axios.defaults.headers.common[REQUEST_HEADER];
};

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(() => {
    const storedAuth = JSON.parse(localStorage.getItem("e-commerce-auth"));
    if (storedAuth?.token) {
      setAxiosToken(storedAuth.token);
    }
    return {
      token: storedAuth?.token || null,
      admin: storedAuth?.admin || false,
    };
  });

  const dispatch = useDispatch();

  useEffect(() => {
    if (auth.token) {
      setAxiosToken(auth.token);
      dispatch(findReqUser(authSignOut));
    } else {
      deleteAxiosToken();
    }
  }, [auth, dispatch]);

  const authSignIn = (token, admin) => {
    setAxiosToken(token);
    setAuth({ token, admin });
    localStorage.setItem("e-commerce-auth", JSON.stringify({ token, admin }));
  };

  const authSignOut = () => {
    deleteAxiosToken();
    localStorage.removeItem("e-commerce-auth");
    setAuth({ token: null, admin: false });
  };

  return (
    <AuthContext.Provider value={{ auth, authSignIn, authSignOut }}>
      {children}
    </AuthContext.Provider>
  );
};
