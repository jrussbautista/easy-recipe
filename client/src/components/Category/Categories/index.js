import React from "react";
import { Link } from "react-router-dom";
import { capitalizeFirstLetter } from "../../../utils";
import styles from "./Categories.module.scss";

const Categories = ({ categories }) => {
  return (
    <div className={styles.category}>
      <ul className={styles.wrapper}>
        {categories.map((category) => (
          <li className={styles.list} key={category.id}>
            <Link to={`/category/${category.id}`} className={styles.link}>
              <img
                className={styles.img}
                src={category.image}
                alt={category.title}
              />
              <div className={styles.info}>
                <p className={styles.title}>
                  {capitalizeFirstLetter(category.title)}
                </p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Categories;
