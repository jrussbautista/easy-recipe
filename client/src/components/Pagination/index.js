import React from "react";
import { GrNext, GrPrevious } from "react-icons/gr";
import styles from "./Pagination.module.scss";

const Pagination = ({ onChange, activePage, itemsPerPage, total }) => {
  let pageNumbers = Math.ceil(total / itemsPerPage);

  const pageNumbersArr = Array(pageNumbers)
    .fill()
    .map((_, i) => i + 1);

  const handlePaginateIcon = (val) => {
    if (val === "prev") {
      if (activePage !== 1) onChange(activePage - 1);
    } else {
      if (activePage !== pageNumbers) onChange(activePage + 1);
    }
  };

  return (
    <div className={styles.pagination}>
      <button
        type="button"
        onClick={() => handlePaginateIcon("prev")}
        className={styles.btnLeft}
      >
        <GrPrevious />
      </button>
      {pageNumbersArr.map((page) => {
        if (page === activePage) {
          return (
            <button className={styles.active} key={page} type="button">
              {page}
            </button>
          );
        } else {
          return (
            <button onClick={() => onChange(page)} key={page} type="button">
              {page}
            </button>
          );
        }
      })}
      <button
        type="button"
        onClick={() => handlePaginateIcon("next")}
        className={styles.btnRight}
      >
        <GrNext />
      </button>
    </div>
  );
};

export default Pagination;
