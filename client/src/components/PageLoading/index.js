import React from "react";
import Spinner from "../Spinner";
import styles from "./PageLoading.module.scss";

const PageLoading = ({ title }) => {
  return (
    <div className={styles.pageLoading}>
      <Spinner light />
      <h2 className={styles.title}>{title}</h2>
    </div>
  );
};

export default PageLoading;
