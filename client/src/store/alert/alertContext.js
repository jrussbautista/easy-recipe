import React, { useState, createContext, useContext } from "react";

const AlertContext = createContext();

export const AlertProvider = ({ children }) => {
  const initState = {
    errors: [],
    type: null,
  };

  const [state, setState] = useState(initState);

  const setAlert = (type, message) => {
    setState({ ...state, errors: message, type });
  };

  const removeAlert = () => {
    setState(initState);
  };

  return (
    <AlertContext.Provider value={{ ...state, setAlert, removeAlert }}>
      {children}
    </AlertContext.Provider>
  );
};

export const useAlert = () => useContext(AlertContext);
