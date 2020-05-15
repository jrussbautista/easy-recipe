import React from "react";
import Seo from "../../components/Seo";
import styles from "./NotFound.module.scss";

export const NotFound = () => {
  return (
    <div className={styles.notFound}>
      <Seo
        title="Easy Recipe - Not Found"
        description="Easy recipe not found page"
      />
      <h1> 404 </h1>
      <div className={styles.text}> Ops. Page not found. </div>
    </div>
  );
};
