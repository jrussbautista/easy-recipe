import React from "react";
import styles from "./Button.module.scss";

export const Button = ({ title, onClick, loading = false, ...rest }) => {
  return (
    <button onClick={onClick} className={styles.btn} {...rest}>
      {loading ? "..." : title}
    </button>
  );
};
