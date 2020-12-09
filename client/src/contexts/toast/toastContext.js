import React, { useState, createContext, useContext } from "react";
import Toast from "../../components/Toast";

const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
  const initState = {
    isActive: false,
    type: null,
    message: null,
    title: null,
  };

  const [state, setState] = useState(initState);

  const setToast = (type, title, message) => {
    setState({ ...state, isActive: true, type, message, title });
    setTimeout(() => {
      setState(initState);
    }, 4000);
  };

  const closeToast = () => {
    setState(initState);
  };

  return (
    <ToastContext.Provider value={{ ...state, setToast, closeToast }}>
      <Toast
        isActive={state.isActive}
        message={state.message}
        title={state.title}
        type={state.type}
        close={closeToast}
      />
      {children}
    </ToastContext.Provider>
  );
};

export const useToast = () => useContext(ToastContext);
