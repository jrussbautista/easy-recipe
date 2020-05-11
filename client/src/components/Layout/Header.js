import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import styles from "./Header.module.scss";
import { FiSearch } from "react-icons/fi";
import { HamburgerIcon } from "../Icons";
import MobileMenu from "./MobileMenu";

export const Header = () => {
  const [isOpenMObileNav, setIsOpenMobileNav] = useState(false);
  const mobileRef = useRef();

  useEffect(() => {
    document.addEventListener("click", handleClickOutSide);
    return () => document.removeEventListener("click", handleClickOutSide);
  }, []);

  const handleClickOutSide = (e) => {
    if (mobileRef.current.contains(e.target)) return;
    setIsOpenMobileNav(false);
  };

  return (
    <header className={styles.header}>
      <div className={styles.headerWrapper}>
        <button
          ref={mobileRef}
          className={styles.btnHamburger}
          onClick={() => setIsOpenMobileNav(!isOpenMObileNav)}
        >
          <HamburgerIcon isOpen={isOpenMObileNav} />
        </button>
        <div className={styles.titleWrapper}>
          <Link to="/" className={styles.title}>
            Easy Recipe
          </Link>
        </div>
        <div className={styles.right}>
          <span className={styles.icon}>
            <FiSearch />
          </span>
        </div>
      </div>

      <MobileMenu isOpen={isOpenMObileNav} />
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
