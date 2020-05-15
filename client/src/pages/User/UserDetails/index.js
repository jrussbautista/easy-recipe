import React from "react";
import styles from "./UserDetails.module.scss";

const UserDetails = ({ user }) => {
  return (
    <div className={styles.user}>
      <div className={styles.card}>
        <div className={styles.userInfo}>
          {user.image ? (
            <img src={user.image} alt={user.name} className={styles.img} />
          ) : (
            <div className={styles.avatar}>{user.name.charAt(0)}</div>
          )}

          <div className={styles.name}>{user.name}</div>
        </div>
      </div>
    </div>
  );
};

export default UserDetails;
