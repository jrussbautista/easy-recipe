import React from "react";
import { HamburgerIcon } from "../Icons";
import styles from "./AppSkeletonHeader.module.scss";

const AppSkeletonHeader = () => {
  return (
    <header className={styles.header}>
      <div className={styles.headerWrapper}>
        <div className={styles.wrapper}>
          <div className={styles.title}>Easy Recipe</div>
        </div>
        <div className={styles.right}>
          <button className={styles.btnHamburger}>
            <HamburgerIcon isOpen={false} />
          </button>
        </div>
      </div>
    </header>
  );
};

export default AppSkeletonHeader;
