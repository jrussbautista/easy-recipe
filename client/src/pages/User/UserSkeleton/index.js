import React from "react";
import styles from "./UserSkeleton.module.scss";
import RecipeListSkeleton from "../../../components/Recipe/RecipeListSkeleton";

const UserRecipeSkeleton = () => {
  return (
    <div className={styles.container}>
      <div className={styles.box}></div>
      <RecipeListSkeleton />
    </div>
  );
};

export default UserRecipeSkeleton;
