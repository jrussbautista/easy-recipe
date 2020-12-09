import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/react-hooks";
import { RECIPE } from "../../graphql/queries";
import RecipeInfo from "./RecipeInfo/RecipeInfo";
import RecipeInfoList from "./RecipeInfoList/RecipeInfoList";
import RecipeSkeleton from "./RecipeSkeleton";
import Seo from "../../components/Seo";
import ErrorMessage from "../../components/ErrorMessage";
import styles from "./Recipe.module.scss";

export const Recipe = () => {
  const { id } = useParams();

  const { data, loading, error } = useQuery(RECIPE, { variables: { id } });

  if (loading)
    return (
      <div className={styles.container}>
        <RecipeSkeleton />
      </div>
    );

  if (error) return <ErrorMessage message="Recipe not found." />;

  const recipe = data.recipe;

  return (
    <div className={styles.container}>
      <Seo
        title={`${recipe.title} - Easy Recipe`}
        description={recipe.description}
      />
      <RecipeInfo recipe={recipe} />
      <RecipeInfoList lists={recipe.ingredients} title="Ingredients" />
      <RecipeInfoList lists={recipe.instructions} title="Directions" />
    </div>
  );
};
