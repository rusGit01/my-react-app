import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <p>© 2025 Your Company. All rights reserved.</p>
      <a href="#">Privacy Policy</a> | <a href="#">Terms of Service</a>
    </footer>
  );
};

export default Footer;