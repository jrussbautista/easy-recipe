import React from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@apollo/react-hooks";
import { CATEGORIES } from "../../../lib/graphql/queries/categories";
import { capitalizeFirstLetter } from "../../../utils";
import styles from "./HomeCategory.module.scss";

const HomeCategory = () => {
  const { loading, error, data } = useQuery(CATEGORIES);

  if (loading) return <div>Loading...</div>;

  if (error) return <div></div>;

  const { categories } = data;

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

export default HomeCategory;
