import React, { createContext, useContext, useReducer, useEffect } from "react";
import reducer from "./authReducer";
import { SET_USER, AUTH_ERROR } from "./authTypes";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const initialState = {
    user: null,
    loading: true,
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      // verify token to backend
      dispatch({ type: AUTH_ERROR });
    }
  }, []);

  const setCurrentUser = (val) => {
    dispatch({ type: SET_USER, payload: val });
  };

  return (
    <AuthContext.Provider value={{ ...state, setCurrentUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
