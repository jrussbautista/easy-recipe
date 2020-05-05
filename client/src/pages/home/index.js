import React from "react";
import Hero from "./Hero";
import styles from "./Home.module.scss";
import HomeCategory from "./HomeCategory";
import RecipeList from "../../components/RecipeList";

export const Home = () => {
  return (
    <div>
      <Hero />
      <div className={styles.container}>
        <h2>Categories</h2>
        <HomeCategory />
        <h2>Latest Recipes</h2>
        <RecipeList />
      </div>
    </div>
  );
};
