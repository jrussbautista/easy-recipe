import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import styles from "./Header.module.scss";
import { FiSearch } from "react-icons/fi";
import { HamburgerIcon } from "../Icons";
import MobileMenu from "./MobileMenu";
import SearchBar from "./SearchBar";

export const Header = () => {
  const [isOpenMObileNav, setIsOpenMobileNav] = useState(false);
  const [isOpenSearchBar, setIsOpenSearchBar] = useState(false);
  const mobileRef = useRef();
  const searchRef = useRef();
  const searchBarRef = useRef();

  useEffect(() => {
    document.addEventListener("click", handleClickOutSide);
    return () => document.removeEventListener("click", handleClickOutSide);
  }, []);

  const handleClickOutSide = (e) => {
    if (
      !searchBarRef.current.contains(e.target) &&
      !searchRef.current.contains(e.target)
    ) {
      setIsOpenSearchBar(false);
    }

    if (!mobileRef.current.contains(e.target)) {
      setIsOpenMobileNav(false);
    }
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
          <span
            ref={searchRef}
            className={styles.icon}
            onClick={() => setIsOpenSearchBar(!isOpenSearchBar)}
          >
            <FiSearch />
          </span>
        </div>
      </div>
      <div ref={searchBarRef}>
        <SearchBar
          isOpen={isOpenSearchBar}
          close={() => setIsOpenSearchBar(false)}
        />
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
