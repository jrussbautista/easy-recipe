import React from "react";
import { BsStarFill, BsStar } from "react-icons/bs";
import styles from "./Rating.module.scss";

const Rating = ({ number = 5 }) => {
  const starsArr = Array(5)
    .fill()
    .map((_, i) => i + 1);

  return (
    <div className={styles.rating}>
      {starsArr.map((star) => (
        <span className={styles.star} key={star}>
          {star <= number ? (
            <BsStarFill color={`var(--color-primary)`} />
          ) : (
            <BsStar color={`var(--color-primary)`} />
          )}
        </span>
      ))}
    </div>
  );
};

export default Rating;
