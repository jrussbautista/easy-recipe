import React from "react";
import RecipeItem from "./RecipeItem";
import styles from "./RecipeList.module.scss";

const RecipeList = ({ recipes }) => {
  return (
    <div className={styles.recipe}>
      {recipes.map((recipe) => (
        <RecipeItem key={recipe.id} {...recipe} />
      ))}
    </div>
  );
};

export default RecipeList;
