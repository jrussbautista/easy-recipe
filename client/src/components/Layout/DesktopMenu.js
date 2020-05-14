import React from "react";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../../store";
import { Button } from "../Common";
import styles from "./DesktopMenu.module.scss";

const DesktopMenu = () => {
  const history = useHistory();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    history.push("/login");
  };

  return (
    <nav className={styles.headerNav}>
      <ul>
        {user ? (
          <>
            <li>
              <Link to={`/recipe/create`} className={styles.link}>
                Create Recipe
              </Link>
            </li>
            <li>
              <Link to={`/user/${user.id}`} className={styles.link}>
                Profile
              </Link>
            </li>
            <li>
              <span className={styles.link}>
                <Button title="Log Out" onClick={handleLogout} />
              </span>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/login"> Login </Link>
            </li>
            <li>
              <Link to="/register"> Create an Account </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default DesktopMenu;
