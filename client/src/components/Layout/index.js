import React from "react";
import { Header } from "./Header";
import styles from "./Layout.module.scss";
import Footer from "./Footer";

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <main className={styles.container}>{children}</main>
      <Footer />
    </>
  );
};

export default Layout;
