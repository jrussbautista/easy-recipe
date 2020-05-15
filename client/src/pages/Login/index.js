import React, { useState, useEffect } from "react";
import { useHistory, Redirect, Link } from "react-router-dom";
import { useMutation } from "@apollo/react-hooks";
import { LOGIN } from "../../lib/graphql/mutations";
import { useAuth, useAlert } from "../../store";
import { Button } from "../../components/Common";
import styles from "./Login.module.scss";
import Alert from "../../components/Alert";

export const Login = () => {
  const history = useHistory();
  const { user: currentUser, login: loginUser } = useAuth();
  const { errors, setAlert, removeAlert, type } = useAlert();

  const initUser = {
    email: "",
    password: "",
  };

  const [user, setUser] = useState(initUser);

  const [login, { loading }] = useMutation(LOGIN, {
    async onCompleted(data) {
      await loginUser(data.login.token, data.login);
      history.push(`/user/${data.login.id}`);
    },
    onError(error) {
      setAlert("error", error.graphQLErrors[0].extensions.exception.errors);
    },
  });

  useEffect(() => {
    return () => removeAlert();
  }, []);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login({ variables: user });
  };

  const handleCloseAlert = () => {
    removeAlert();
  };

  if (currentUser && !loading)
    return <Redirect to={`/user/${currentUser.id}`} />;

  return (
    <div className={styles.login}>
      <h2 className={styles.heading}> Login your account </h2>

      <Alert type={type} alerts={errors} close={handleCloseAlert} />

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
      <div className={styles.authLink}>
        <p>
          Don't have an account? <Link to="/register">Register</Link> here.
        </p>
      </div>
    </div>
  );
};
