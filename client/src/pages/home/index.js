import React from "react";

import Hero from "./homeHero/Hero";
import styles from "./Home.module.scss";
import HomeCategory from "./homeCategory/HomeCategory";
import HomeRecipes from "./homeRecipes/HomeRecipes";

export const Home = () => {
  return (
    <div>
      <Hero />
      <div className={styles.container}>
        <h2>Categories</h2>
        <HomeCategory />
        <HomeRecipes />
      </div>
    </div>
  );
};
