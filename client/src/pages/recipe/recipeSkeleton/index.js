import React from "react";
import styles from "./RecipeSkeleton.module.scss";

const RecipeSkeleton = () => {
  return (
    <div className={styles.skeleton}>
      <div className={styles.boxWrapper}></div>
      <div className={styles.lineWrapper}>
        <div className={styles.line}></div>
        <div className={styles.line} style={{ width: "20rem" }}></div>
        <div className={styles.line} style={{ width: "15rem" }}></div>
      </div>
    </div>
  );
};

export default RecipeSkeleton;
