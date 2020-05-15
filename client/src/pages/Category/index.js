import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/react-hooks";
import { CATEGORY } from "../../lib/graphql/queries/category";
import RecipeList from "../../components/RecipeList";
import RecipeSkeleton from "../../components/RecipeSkeleton";
import ErrorMessage from "../../components/ErrorMessage";
import Seo from "../../components/Seo";
import styles from "./Category.module.scss";

export const Category = () => {
  const { id } = useParams();
  const { data, loading, error } = useQuery(CATEGORY, {
    variables: { id, page: 1, limit: 1 },
  });

  if (loading)
    return (
      <div className={styles.category}>
        <div className={styles.cover}></div>
        <div className={styles.container}>
          <RecipeSkeleton />
        </div>
      </div>
    );

  if (error) return <ErrorMessage message={`Error in fetching category`} />;

  const { category } = data;

  const { recipes } = category;

  return (
    <div className={styles.category}>
      <Seo
        title={`Easy Recipe - ${category.title}`}
        description={`easy recipe - ${category.title}`}
      />
      <div
        style={{ backgroundImage: `url(${category.image})` }}
        className={styles.cover}
      >
        <div className={styles.info}>
          <div className={styles.title}>{category.title}</div>
        </div>
      </div>
      <div className={styles.container}>
        {recipes.total === 0 ? (
          <div className={styles.empty}>
            {" "}
            No recipes created for this category yet.{" "}
          </div>
        ) : (
          <>
            <h2> Recipes </h2>
            <RecipeList recipes={recipes.result} />
          </>
        )}
      </div>
    </div>
  );
};
