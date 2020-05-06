import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useMutation } from "@apollo/react-hooks";
import { LOGIN } from "../../lib/graphql/mutations";
import { useAuth } from "../../store";
import styles from "./Login.module.scss";

export const Login = () => {
  const history = useHistory();
  const { setCurrentUser } = useAuth();

  const initUser = {
    email: "",
    password: "",
  };

  const [user, setUser] = useState(initUser);

  const [login, { data, loading, error }] = useMutation(LOGIN, {
    onCompleted(data) {
      setCurrentUser(data.login);
      localStorage.setItem("token", data.login.token);
      history.push(`/user/${data.login.id}`);
    },
    onError(err) {
      console.log(err);
    },
  });

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login({ variables: user });
  };

  return (
    <div className={styles.login}>
      <h2 className={styles.heading}> Login your account </h2>
      {error && <div>Something went wrong</div>}

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email"> Email: </label>
          <input type="text" id="email" name="email" onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="email"> Password: </label>
          <input
            type="password"
            id="password"
            name="password"
            onChange={handleChange}
          />
        </div>
        <div>
          <button type="submit" disabled={loading}>
            {loading ? "logging in..." : "Login"}
          </button>
        </div>
      </form>
    </div>
  );
};
