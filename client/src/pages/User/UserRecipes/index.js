import React from "react";
import RecipeList from "../../../components/RecipeList";

const UserRecipes = ({ recipes }) => {
  return (
    <div>
      <h2> Created Recipes </h2>
      <RecipeList recipes={recipes} />
    </div>
  );
};

export default UserRecipes;
