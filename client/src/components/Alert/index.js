import React from "react";
import { IoMdClose } from "react-icons/io";
import styles from "./Alert.module.scss";

const Alert = ({ alerts, type, close }) => {
  return (
    <>
      {alerts.length > 0 && (
        <div className={`${styles.alert} ${type ? styles[type] : ""}`}>
          <div>
            {alerts.map((alert, i) => (
              <div key={i} className={styles.text}>
                {alert.message}
              </div>
            ))}
          </div>
          <span className={styles.icon} onClick={close}>
            <IoMdClose size={25} />
          </span>
        </div>
      )}
    </>
  );
};

export default Alert;
