import React from "react";
import styles from "./UserSkeleton.module.scss";
import RecipeSkeleton from "../../../components/RecipeSkeleton";

const UserRecipeSkeleton = () => {
  return (
    <div className={styles.container}>
      <div className={styles.box}></div>
      <RecipeSkeleton />
    </div>
  );
};

export default UserRecipeSkeleton;
