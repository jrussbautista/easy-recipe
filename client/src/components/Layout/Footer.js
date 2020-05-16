import React from "react";
import { AiFillGithub } from "react-icons/ai";
import styles from "./Footer.module.scss";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.text}>
        Developed with love by James Russel C. Bautista
      </div>
      <div className={styles.text}>
        Fork this project on {"  "}
        <a
          href="https://github.com/jrussumbrella/easy-recipe"
          className={styles.link}
          target="_blank"
        >
          <AiFillGithub size={25} />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
