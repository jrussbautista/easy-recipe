import React from "react";
import styles from "./CategoriesSkeleton.module.scss";

const CategorySkeleton = ({ numbers = 8 }) => {
  const categories = Array(numbers)
    .fill()
    .map((_, i) => i);

  return (
    <div className={styles.category}>
      <ul className={styles.wrapper}>
        {categories.map((category, i) => (
          <li className={styles.list} key={i}>
            <div className={styles.img}></div>
            <div className={styles.info}>
              <p className={styles.title}></p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategorySkeleton;
