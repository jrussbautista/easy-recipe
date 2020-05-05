import React from "react";
import RecipeItem from "./RecipeItem";

const RecipeList = ({ recipes }) => {
  return (
    <div>
      {recipes.map((recipe) => (
        <RecipeItem key={recipe.id} {...recipe} />
      ))}
    </div>
  );
};

export default RecipeList;
