import React from "react";
import { FiSearch } from "react-icons/fi";
import { HamburgerIcon } from "../Icons";
import styles from "./AppSkeletonHeader.module.scss";

const AppSkeletonHeader = () => {
  return (
    <header className={styles.header}>
      <div className={styles.headerWrapper}>
        <button className={styles.btnHamburger}>
          <HamburgerIcon isOpen={false} />
        </button>
        <div className={styles.wrapper}>
          <div className={styles.title}>Easy Recipe</div>
        </div>
        <div className={styles.right}>
          <span className={styles.icon}>
            <FiSearch />
          </span>
        </div>
      </div>
    </header>
  );
};

export default AppSkeletonHeader;
