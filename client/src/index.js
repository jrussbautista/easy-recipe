import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";
import { AuthProvider, ToastProvider } from "./store";

const client = new ApolloClient({
  uri: "http://localhost:4000",
  request: (operation) => {
    const token = localStorage.getItem("token") || "";
    operation.setContext({
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
  },
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <AuthProvider>
      <ToastProvider>
        <React.StrictMode>
          <App />
        </React.StrictMode>
      </ToastProvider>
    </AuthProvider>
  </ApolloProvider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
