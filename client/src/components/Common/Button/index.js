import React from "react";
import { Link } from "react-router-dom";
import styles from "./Button.module.scss";

export const Button = ({ title, onClick, loading = false, to, ...rest }) => {
  return (
    <>
      {to ? (
        <Link to={to} className={styles.btn}>
          {title}
        </Link>
      ) : (
        <button onClick={onClick} className={styles.btn} {...rest}>
          {loading ? "..." : title}
        </button>
      )}
    </>
  );
};
