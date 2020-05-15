import React, { useState, useRef, useEffect } from "react";
import { useHistory } from "react-router-dom";
import styles from "./SearchBar.module.scss";

const SearchBar = ({ isOpen, close }) => {
  const [search, setSearch] = useState("");
  const history = useHistory();
  const inputRef = useRef();

  useEffect(() => {
    if (isOpen) inputRef.current.focus();
  }, [isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    close();
    if (search.trim().length > 0) {
      history.push(`/recipes?search=${search}`);
    }
  };

  return (
    <div className={`${styles.search} ${isOpen ? styles.isOpen : ""}`}>
      <div className={styles.wrapper}>
        <form onSubmit={handleSubmit}>
          <input
            ref={inputRef}
            type="text"
            placeholder="Search Recipe here..."
            onChange={(e) => setSearch(e.target.value)}
            value={search}
          />
          <button type="submit"> Search </button>
        </form>
      </div>
    </div>
  );
};

export default SearchBar;
