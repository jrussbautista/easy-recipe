import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/react-hooks";
import { USER } from "../../lib/graphql/queries/user";
import UserDetails from "./UserDetails";
import styles from "./User.module.scss";
import UserRecipes from "./UserRecipes";
import ErrorMessage from "../../components/ErrorMessage";
import RecipeSkeleton from "./UserSkeleton";
import Pagination from "../../components/Pagination";

const PAGE_LIMIT = 5;

export const User = () => {
  const { id } = useParams();

  const [page, setPage] = useState(1);
  const { data, loading, error } = useQuery(USER, {
    variables: { id, page, limit: PAGE_LIMIT },
  });

  const handlePageChange = (val) => {
    setPage(val);
  };

  if (loading) return <RecipeSkeleton />;

  if (error)
    return (
      <ErrorMessage message={`Something went wrong. Please try again later.`} />
    );

  const { user } = data;
  const { recipes } = user;

  return (
    <div className={styles.container}>
      <UserDetails user={user} />
      {recipes.result.length === 0 ? (
        <h2 className={styles.empty}> No created recipe yet. </h2>
      ) : (
        <>
          <UserRecipes recipes={recipes.result} />
          <Pagination
            onChange={handlePageChange}
            activePage={page}
            total={recipes.total}
            itemsPerPage={PAGE_LIMIT}
          />
        </>
      )}
    </div>
  );
};
