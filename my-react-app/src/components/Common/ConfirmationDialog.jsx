import React from "react";
import styles from "./ConfirmationDialog.module.css";

const ConfirmationDialog = ({ message, onConfirm, onCancel }) => {
  return (
    <div className={styles.overlay}>
      <div className={styles.dialog}>
        <p>{message}</p>
        <div className={styles.buttons}>
          <button onClick={onConfirm}>Yes</button>
          <button onClick={onCancel}>No</button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationDialog;