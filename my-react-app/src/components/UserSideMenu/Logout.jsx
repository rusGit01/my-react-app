import React from "react";
import styles from "./Logout.module.css";

const Logout = () => {
  return (
    <div className={styles.logoutContainer}>
      <h1>Logout</h1>
      <p>You have been logged out.</p>
    </div>
  );
};

export default Logout;