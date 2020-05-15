import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { RECIPES } from "../../../lib/graphql/queries";
import { Button } from "../../../components/Common";
import RecipeList from "../../../components/RecipeList";
import RecipeSkeleton from "../../../components/RecipeSkeleton";
import styles from "./HomeRecipes.module.scss";

const PAGE_LIMIT = 12;

const HomeRecipes = () => {
  const { data, loading, error } = useQuery(RECIPES, {
    variables: { page: 1, limit: PAGE_LIMIT },
    fetchPolicy: "cache-and-network",
  });

  if (error) return <h2>Something went wrong</h2>;

  if (loading) return <RecipeSkeleton />;

  const recipes = data?.recipes?.result;

  return (
    <div>
      <h2>Latest Recipes</h2>
      <RecipeList recipes={recipes} />
      <div className={styles.btnWrapper}>
        <Button title="See More" to="/recipes?page=2" classType="outline" />
      </div>
    </div>
  );
};

export default HomeRecipes;
