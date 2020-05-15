import React from "react";
import styles from "./NotFound.module.scss";

export const NotFound = () => {
  return (
    <div className={styles.notFound}>
      <h1> 404 </h1>
      <div className={styles.text}> Ops. Page not found. </div>
    </div>
  );
};
