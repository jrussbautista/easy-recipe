import React from "react";
import { MdErrorOutline, MdClose, MdCheckCircle } from "react-icons/md";
import styles from "./Toast.module.scss";

const Toast = ({ isActive, title = "", message = "", type, close }) => {
  return (
    <div className={`${styles.toast} ${isActive ? styles.show : ""}`}>
      <div className={styles.container}>
        <div className={styles.icon}>
          {type === "error" ? (
            <MdErrorOutline size={25} color="var(--color-danger)" />
          ) : (
            <MdCheckCircle size={25} color="var(--color-success)" />
          )}
        </div>
        <div className={styles.msg}>
          <div className={styles.title}>{title}</div>
          <div className={styles.text}>{message}</div>
        </div>
        <div className={styles.close}>
          <span onClick={close}>
            <MdClose size={25} />
          </span>
        </div>
      </div>
    </div>
  );
};

export default Toast;
