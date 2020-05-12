import React, { useState } from "react";
import { useLocation, useHistory } from "react-router-dom";
import { useQuery } from "@apollo/react-hooks";
import { RECIPES } from "../../lib/graphql/queries";
import RecipeList from "../../components/RecipeList";
import RecipeSkeleton from "../../components/RecipeSkeleton";
import ErrorMessage from "../../components/ErrorMessage";
import styles from "./Recipes.module.scss";
import Pagination from "../../components/Pagination";

const PAGE_LIMIT = 5;

export const Recipes = () => {
  const history = useHistory();
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  let pageQuery = query.get("page");
  pageQuery = Number(pageQuery) || 1;

  const [page, setPage] = useState(pageQuery);
  const { loading, data, error } = useQuery(RECIPES, {
    variables: { page, limit: PAGE_LIMIT },
  });

  if (loading) {
    return (
      <div className={styles.container}>
        <RecipeSkeleton />
      </div>
    );
  }

  if (error) {
    return (
      <ErrorMessage message="Error in viewing recipes. Please try again" />
    );
  }

  const recipes = data.recipes.result;
  const total = data.recipes.total;

  const handlePageChange = (val) => {
    setPage(val);
    window.scrollTo(0, 0);
    history.push(`/recipes?page=${val}`);
  };

  return (
    <div className={styles.container}>
      <h2> All Recipes </h2>
      <RecipeList recipes={recipes} />
      <Pagination
        onChange={handlePageChange}
        activePage={page}
        total={total}
        itemsPerPage={PAGE_LIMIT}
      />
    </div>
  );
};
