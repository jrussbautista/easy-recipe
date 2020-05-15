import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../../store";
import { Button } from "../Common";
import { FiSearch } from "react-icons/fi";
import styles from "./DesktopMenu.module.scss";

const DesktopMenu = () => {
  const history = useHistory();
  const { user, logout } = useAuth();
  const [search, setSearch] = useState(" ");

  const handleLogout = () => {
    logout();
    history.push("/login");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (search.trim().length > 0) {
      history.push(`/recipes?search=${search}`);
    }
  };

  return (
    <nav className={styles.headerNav}>
      <div className={styles.searchBar}>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Search recipe..."
            onChange={(e) => setSearch(e.target.value)}
          />
          <button type="submit">
            <FiSearch size={20} />
          </button>
        </form>
      </div>
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
              <span className={styles.link}>
                <Button title="Try for free" to="/register" />
              </span>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default DesktopMenu;
