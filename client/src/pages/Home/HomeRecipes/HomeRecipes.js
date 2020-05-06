import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { RECIPES } from "../../../lib/graphql/queries";
import RecipeList from "../../../components/RecipeList";
import RecipeSkeleton from "../../../components/RecipeSkeleton";

const HomeRecipes = () => {
  const { data, loading, error } = useQuery(RECIPES, {
    variables: { page: 1, limit: 5 },
  });

  if (error) return <h2>Something went wrong</h2>;

  if (loading) return <RecipeSkeleton />;

  const recipes = data?.recipes?.result;

  return (
    <div>
      <h2>Latest Recipes</h2>
      <RecipeList recipes={recipes} />
    </div>
  );
};

export default HomeRecipes;
