import React from "react";
import styles from "./ErrorMessage.module.scss";
import Button from "../Button";

const ErrorMessage = ({ message }) => {
  return (
    <div className={styles.container}>
      <p>{message}</p>
      <Button title="Back to home" to="/" />
    </div>
  );
};

export default ErrorMessage;
