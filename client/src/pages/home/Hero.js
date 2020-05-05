import React from "react";
import styles from "./Hero.module.scss";

const Hero = () => {
  return (
    <div
      style={{
        backgroundImage: `url('http://demo.mattsapii.co/taplak/images/content/slide-15.png')`,
      }}
      className={styles.hero}
    >
      <div className={styles.overlay}>
        <h1 className={styles.title}> Find the best recipe</h1>
      </div>
    </div>
  );
};

export default Hero;
