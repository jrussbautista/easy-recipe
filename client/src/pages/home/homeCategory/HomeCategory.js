import React from "react";
import styles from "./HomeCategory.module.scss";

const HomeCategory = () => {
  return (
    <div className={styles.category}>
      <ul className={styles.wrapper}>
        <li className={styles.list}>
          <a href="#" className={styles.link}>
            <img
              className={styles.img}
              src={`https://149410494.v2.pressablecdn.com/wp-content/uploads/elementor/thumbs/appetizer-bruschetta-with-tuna-and-tomatoes-LKA5ZYU-omrs5yczemz943vxo1dqw9tztvscarh3mzggf5azkw.jpg`}
              alt=""
            />
            <div className={styles.info}>
              <p className={styles.title}>Appetizers</p>
            </div>
          </a>
        </li>
        <li className={styles.list}>
          <a href="#" className={styles.link}>
            <img
              className={styles.img}
              src={`https://149410494.v2.pressablecdn.com/wp-content/uploads/elementor/thumbs/beef-steak-tomahawk-S3JHQLN-omrts6h2r6ooajb7o7fsckvwj4sv3smiz698m6z25c.jpg`}
              alt=""
            />
            <div className={styles.info}>
              <p className={styles.title}>Beef</p>
            </div>
          </a>
        </li>
        <li className={styles.list}>
          <a href="#" className={styles.link}>
            <img
              className={styles.img}
              src={`https://149410494.v2.pressablecdn.com/wp-content/uploads/elementor/thumbs/beef-steak-tomahawk-S3JHQLN-omrts6h2r6ooajb7o7fsckvwj4sv3smiz698m6z25c.jpg`}
              alt=""
            />
            <div className={styles.info}>
              <p className={styles.title}>Beef</p>
            </div>
          </a>
        </li>
        <li className={styles.list}>
          <a href="#" className={styles.link}>
            <img
              className={styles.img}
              src={`https://149410494.v2.pressablecdn.com/wp-content/uploads/elementor/thumbs/beef-steak-tomahawk-S3JHQLN-omrts6h2r6ooajb7o7fsckvwj4sv3smiz698m6z25c.jpg`}
              alt=""
            />
            <div className={styles.info}>
              <p className={styles.title}>Beef</p>
            </div>
          </a>
        </li>
      </ul>
    </div>
  );
};

export default HomeCategory;
