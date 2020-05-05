import React from "react";
import { Link } from "react-router-dom";
import styles from "./Header.module.scss";
import { HamburgeIcon } from "../Icons";

export const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.wrapper}>
        <Link to="/" className={styles.title}>
          Easy Recipe
        </Link>
      </div>
      <div className={styles.right}>
        <button className={styles.btnHamburger}>
          <HamburgeIcon />
        </button>
      </div>
      <nav className={styles.headerNav}>
        <ul>
          <li>
            <Link to="/login"> Easy Recipe </Link>
          </li>
          <li>
            <Link to="/register"> Easy Recipe </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};
