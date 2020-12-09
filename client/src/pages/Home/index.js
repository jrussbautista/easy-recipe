import React from "react";
import Hero from "../../components/Hero";
import { useQuery } from "@apollo/react-hooks";
import { RECIPES, CATEGORIES } from "../../graphql/queries";
import Button from "../../components/Button";
import RecipeList from "../../components/Recipe/RecipeList";
import RecipeListSkeleton from "../../components/Recipe/RecipeListSkeleton";
import Categories from "../../components/Category/Categories";
import CategoriesSkeleton from "../../components/Category/CategoriesSkeleton";

import styles from "./Home.module.scss";

const PAGE_LIMIT = 12;

export const Home = () => {
  const { data: recipesData, loading: recipesLoading } = useQuery(RECIPES, {
    variables: { page: 1, limit: PAGE_LIMIT },
    fetchPolicy: "cache-and-network",
  });

  const { loading: categoriesLoading, data: categoriesData } = useQuery(
    CATEGORIES
  );

  const recipes = recipesData?.recipes?.result;
  const categories = categoriesData?.categories;

  const renderCategoriesSection = () => {
    if (categoriesLoading) {
      return <CategoriesSkeleton />;
    }
    if (categories) {
      return <Categories categories={categories} />;
    }
  };

  const renderRecipesSection = () => {
    if (recipesLoading) {
      return <RecipeListSkeleton />;
    }
    if (recipes) {
      return <RecipeList recipes={recipes} />;
    }
    return null;
  };

  return (
    <div>
      <Hero />
      <div className={styles.container}>
        <h2>Categories</h2>
        {renderCategoriesSection()}
        <h2>Latest Recipes</h2>
        {renderRecipesSection()}
        <div className={styles.btnWrapper}>
          <Button title="See More" to="/recipes?page=2" classType="outline" />
        </div>
      </div>
    </div>
  );
};
