import React, { useState } from "react";
import styles from "./Login.module.css";

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Hardcoded credentials (for testing only)
    const validEmailUser = "user@example.com";
    const validPasswordUser = "password123";
    const validEmailAdmin = "admin@example.com";
    const validPasswordAdmin = "admin123";

    if (email === validEmailUser && password === validPasswordUser) {
      onLogin("user"); // Pass "user" role to onLogin
    } else if (email === validEmailAdmin && password === validPasswordAdmin) {
      onLogin("admin"); // Pass "admin" role to onLogin
    } else {
      alert("Invalid email or password"); // Show an error message
    }
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginBox}>
        <h1 className={styles.loginHeader}>Login</h1>
        <form onSubmit={handleSubmit}>
          <div className={styles.inputGroup}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className={styles.loginButton}>
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;