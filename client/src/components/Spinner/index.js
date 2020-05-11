import React from "react";
import styles from "./Spinner.module.scss";

const Spinner = ({ size = 5 }) => {
  return (
    <div
      className={styles.loader}
      style={{ width: `${size}rem`, height: `${size}rem` }}
    ></div>
  );
};

export default Spinner;
