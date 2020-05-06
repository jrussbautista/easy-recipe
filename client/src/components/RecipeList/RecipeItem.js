import React from "react";
import { Link } from "react-router-dom";
import styles from "./RecipeItem.module.scss";
import Rating from "../Rating";

const RecipeItem = ({ image, title, ratingsCount, id }) => {
  return (
    <div className={styles.recipe}>
      <Link to={`/recipe/${id}`}>
        <div className={styles.imgWrapper}>
          <img className={styles.img} src={image} alt={title} />
        </div>
        <div className={styles.info}>
          <div className={styles.title}> {title}</div>
          <Rating number={ratingsCount} />
        </div>
      </Link>
    </div>
  );
};

export default RecipeItem;
