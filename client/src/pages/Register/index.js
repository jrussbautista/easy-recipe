import React, { useState, useEffect } from "react";
import { useHistory, Redirect, Link } from "react-router-dom";
import { useMutation } from "@apollo/react-hooks";
import { REGISTER } from "../../lib/graphql/mutations";
import { useAuth, useAlert } from "../../store";
import { Button } from "../../components/Common";
import Alert from "../../components/Alert";
import styles from "./Register.module.scss";

export const Register = () => {
  const history = useHistory();
  const { user: currentUser, login: loginUser } = useAuth();
  const { errors, setAlert, removeAlert, type } = useAlert();

  const initUser = {
    name: "",
    email: "",
    password: "",
  };

  const [user, setUser] = useState(initUser);

  const [register, { loading }] = useMutation(REGISTER, {
    async onCompleted(data) {
      await loginUser(data.register.token, data.register);
      history.push(`/user/${data.register.id}`);
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
    await register({ variables: { input: user } });
  };

  const handleCloseAlert = () => {
    removeAlert();
  };

  if (currentUser && !loading)
    return <Redirect to={`/user/${currentUser.id}`} />;

  return (
    <div className={styles.register}>
      <h2 className={styles.heading}> Register your account </h2>
      <Alert type={type} alerts={errors} close={handleCloseAlert} />
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.group}>
          <label htmlFor="email"> Name: </label>
          <input
            type="text"
            id="text"
            name="name"
            onChange={handleChange}
            className={styles.input}
          />
        </div>
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
            <Button title="Register" type="submit" loading={loading} />
          </div>
        </div>
      </form>
      <div className={styles.authLink}>
        <p>
          Already have an account? <Link to="/login">Login</Link> here.
        </p>
      </div>
    </div>
  );
};
