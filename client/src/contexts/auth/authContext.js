import React, { createContext, useContext, useReducer, useEffect } from "react";
import reducer from "./authReducer";
import { SET_USER, AUTH_ERROR, LOG_OUT } from "./authTypes";
import { useMutation } from "@apollo/react-hooks";
import { LOGIN_VIA_TOKEN } from "../../graphql/mutations/loginViaToken";
import cookie from "js-cookie";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const initialState = {
    user: null,
    loading: true,
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  const setCurrentUser = (val) => {
    dispatch({ type: SET_USER, payload: val });
  };

  const login = (token, userData) => {
    cookie.set("token", token);
    setCurrentUser(userData);
  };

  const logout = () => {
    cookie.remove("token");
    dispatch({ type: LOG_OUT });
  };

  const [loginViaToken] = useMutation(LOGIN_VIA_TOKEN, {
    onError: () => {
      dispatch({ type: AUTH_ERROR });
    },
    onCompleted: (data) => {
      setCurrentUser(data.loginViaToken);
    },
  });

  useEffect(() => {
    const token = cookie.get("token");
    if (token) {
      // verify token to backend
      loginViaToken();
    } else {
      dispatch({ type: AUTH_ERROR });
    }
  }, [loginViaToken]);

  return (
    <AuthContext.Provider value={{ ...state, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
