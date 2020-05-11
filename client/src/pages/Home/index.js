import React from "react";
import { Button } from "../../components/Common";
import Hero from "./HomeHero/Hero";
import styles from "./Home.module.scss";
import HomeCategory from "./HomeCategory/HomeCategory";
import HomeRecipes from "./HomeRecipes/HomeRecipes";

export const Home = () => {
  return (
    <div>
      <Hero />
      <div className={styles.container}>
        <h2>Categories</h2>
        <HomeCategory />
        <HomeRecipes />
        <div className={styles.btnWrapper}>
          <Button
            title="See More"
            to="/recipes/2"
            classType="outline"
            style={{ width: "100%" }}
          />
        </div>
      </div>
    </div>
  );
};
