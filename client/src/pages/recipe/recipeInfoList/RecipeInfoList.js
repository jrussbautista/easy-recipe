import React from "react";
import styles from "./RecipeInfoList.module.scss";

const RecipeInfoList = ({ lists, title }) => {
  return (
    <div className={styles.ingredient}>
      <div className={styles.title}> {title} </div>
      <ul className={styles.list}>
        {lists.map((list, i) => (
          <li key={i}>
            <span>{i + 1}.</span> {list}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecipeInfoList;
