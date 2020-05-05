import React from "react";
import styles from "./RecipeItem.module.scss";
import Rating from "../Rating";

const RecipeItem = () => {
  return (
    <div className={styles.recipe}>
      <div className={styles.imgWrapper}>
        <img
          className={styles.img}
          src="https://149410494.v2.pressablecdn.com/wp-content/uploads/2020/03/pecan-pie-tart-in-baking-dish-traditional-festive-9WMXQ3Z-700x525.jpg"
          alt=""
        />
      </div>
      <div className={styles.info}>
        <div className={styles.title}> Picha Pie</div>
        <Rating number={1} />
      </div>
    </div>
  );
};

export default RecipeItem;
