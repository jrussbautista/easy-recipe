import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useMutation } from "@apollo/react-hooks";
import { LOGIN } from "../../lib/graphql/mutations";
import { useAuth, useToast } from "../../store";
import { Button } from "../../components/Common";
import styles from "./Login.module.scss";

export const Login = () => {
  const history = useHistory();
  const { setCurrentUser } = useAuth();
  const { setToast } = useToast();

  const initUser = {
    email: "",
    password: "",
  };

  const [user, setUser] = useState(initUser);

  const [login, { loading }] = useMutation(LOGIN, {
    onCompleted(data) {
      setCurrentUser(data.login);
      localStorage.setItem("token", data.login.token);
      history.push(`/user/${data.login.id}`);
      // setToast("success", "Success", "Log In Successfully");
    },
    onError() {
      setToast("error", "Error", "Email or password is incorrect!");
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

      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.group}>
          <label htmlFor="email"> Email: </label>
          <input
            type="text"
            id="email"
            name="email"
            onChange={handleChange}
            className={styles.input}
          />
        </div>
        <div className={styles.group}>
          <label htmlFor="email"> Password: </label>
          <input
            className={styles.input}
            type="password"
            id="password"
            name="password"
            onChange={handleChange}
          />
        </div>
        <div className={styles.group}>
          <div className={styles.btnWrapper}>
            <Button title="Log In" type="submit" loading={loading} />
          </div>
        </div>
      </form>
    </div>
  );
};
