import React from "react";
import styles from "./Button.module.scss";

export const Button = ({ title, onClick }) => {
  return (
    <button onClick={onClick} className={styles.btn}>
      {title}
    </button>
  );
};
