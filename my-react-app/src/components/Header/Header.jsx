import styles from "./Header.module.css";
import logo from "./logo.png";
import Profile from "./funny-cat.jpg";

const Header = () => {
  return (
    <header className={styles.header}>
      <img src={logo} alt="Logo" className={styles.logo} />
      <input type="text" className={styles.searchBar} placeholder="Search files..." />
      <button className={styles.profileButton}>
        <img src={Profile} alt="Profile" />
      </button>
    </header>
  );
};

export default Header;