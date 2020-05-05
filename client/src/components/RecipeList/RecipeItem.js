import React from "react";
import styles from "./RecipeItem.module.scss";
import Rating from "../Rating";

const RecipeItem = ({ image, title, ratingsCount }) => {
  return (
    <div className={styles.recipe}>
      <div className={styles.imgWrapper}>
        <img className={styles.img} src={image} alt={title} />
      </div>
      <div className={styles.info}>
        <div className={styles.title}> {title}</div>
        <Rating number={ratingsCount} />
      </div>
    </div>
  );
};

export default RecipeItem;
