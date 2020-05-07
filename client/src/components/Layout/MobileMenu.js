import React from "react";
import { Link } from "react-router-dom";
import styles from "./MobileMenu.module.scss";

const MobileMenu = () => {
  return (
    <div className={styles.mobileMenu}>
      <nav>
        <ul>
          <li>
            <Link to="/login"> Login to your Account </Link>
          </li>
          <li>
            <Link to="/register"> Create An Account </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default MobileMenu;
