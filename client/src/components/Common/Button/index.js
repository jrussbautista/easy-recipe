import React from "react";
import { Link } from "react-router-dom";
import styles from "./Button.module.scss";

export const Button = ({
  title,
  onClick,
  loading = false,
  classType,
  to,
  ...rest
}) => {
  return (
    <>
      {to ? (
        <Link
          to={to}
          className={`${styles.btn} ${classType ? styles[classType] : ""}`}
          {...rest}
        >
          {title}
        </Link>
      ) : (
        <button
          onClick={onClick}
          className={`${styles.btn} ${classType ? styles[classType] : ""}`}
          {...rest}
        >
          {loading ? "..." : title}
        </button>
      )}
    </>
  );
};
