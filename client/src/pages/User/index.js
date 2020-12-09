import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/react-hooks";
import { USER } from "../../graphql/queries/user";
import Pagination from "../../components/Pagination";
import ErrorMessage from "../../components/ErrorMessage";
import RecipeList from "../../components/Recipe/RecipeList";
import Seo from "../../components/Seo";
import UserDetails from "./UserDetails";
import UserSkeleton from "./UserSkeleton";
import styles from "./User.module.scss";

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

  if (loading) return <UserSkeleton />;

  if (error)
    return (
      <ErrorMessage message={`Something went wrong. Please try again later.`} />
    );

  const { user } = data;
  const { recipes } = user;

  return (
    <div className={styles.container}>
      <Seo title={`${user.name} - Easy Recipe`} />
      <UserDetails user={user} />
      {recipes.result.length === 0 ? (
        <h2 className={styles.empty}> No created recipe yet. </h2>
      ) : (
        <>
          <RecipeList />
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
