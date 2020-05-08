import React from "react";
import styles from "./ErrorMessage.module.scss";
import { Button } from "../Common";

const ErrorMessage = ({ message }) => {
  return (
    <div className={styles.container}>
      <p>{message}</p>
      <Button title="Back to home" to="/" />
    </div>
  );
};

export default ErrorMessage;
