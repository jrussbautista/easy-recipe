import React from "react";
import styles from "./RecipeSkeleton.module.scss";

const RecipeSkeleton = ({ numbers = 10 }) => {
  const gridArr = Array(numbers)
    .fill()
    .map((_, i) => i + 1);

  return (
    <div className={styles.wrapper}>
      <div className={styles.heading} style={{ width: "15rem" }}></div>
      <div className={styles.grid}>
        {gridArr.map((grid) => (
          <div className={styles.card} key={grid}>
            <div className={styles.img}></div>
            <div className={styles.info}>
              <div className={styles.line} style={{ width: "100%" }}></div>
              <div className={styles.line} style={{ width: "10rem" }}></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecipeSkeleton;
