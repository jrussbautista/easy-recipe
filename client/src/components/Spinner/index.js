import React from "react";
import styles from "./Spinner.module.scss";

const Spinner = ({ size = 5, invert }) => {
  return (
    <div
      className={`${styles.loader} ${invert ? styles.invert : ""}`}
      style={{ width: `${size}rem`, height: `${size}rem` }}
    ></div>
  );
};

export default Spinner;
