import React from "react";
import styles from "./HamburgerIcon.module.scss";

export const HamburgerIcon = ({ isOpen }) => {
  return (
    <div>
      <div
        className={`${styles.hamburger}  ${styles.hamburgerSlider} ${
          isOpen ? styles.isActive : ""
        }`}
      >
        <div className={styles.hamburgerBox}>
          <div className={styles.hamburgerInner}></div>
        </div>
      </div>
    </div>
  );
};
