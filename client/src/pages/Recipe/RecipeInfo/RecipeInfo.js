import React from "react";
import { Link } from "react-router-dom";
import styles from "./RecipeInfo.module.scss";
import Rating from "../../../components/Rating";

const RecipeInfo = ({ recipe }) => {
  return (
    <div className={styles.recipe}>
      <div className={styles.recipeCard}>
        <div className={styles.coverWrapper}>
          <img
            src={recipe.image}
            alt={recipe.name}
            className={styles.mainImg}
          />
        </div>
        <div className={styles.info}>
          <div className={styles.recipeTitle}>{recipe.title}</div>
          <div className={styles.desc}>{recipe.description}</div>
          <Rating number={recipe.ratingsCount} />
          <ul className={styles.list}>
            <li>
              <p className={styles.label}> Category </p>
              <p className={styles.name}> Chicken </p>
            </li>
            <li>
              <p className={styles.label}> Difficulty </p>
              <p className={styles.name}> Beginner </p>
            </li>
          </ul>
        </div>
      </div>
      <Link to={`/user/${recipe.author.id}`}>
        <div className={styles.authorInfo}>
          <div className={styles.avatarWrapper}>
            <img src={recipe.author.image} alt={recipe.author.name} />
          </div>

          <div>
            <p className={styles.author}>Author</p>
            <p className={styles.userName}>{recipe.author.name}</p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default RecipeInfo;
