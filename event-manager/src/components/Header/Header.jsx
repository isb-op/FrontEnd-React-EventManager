import { Link } from "react-router-dom";
import styles from "./Header.module.css";
const Header = () => {
  return (
    <header className={styles.header}>
      <nav>
        <Link to="/events" className={styles.navLink}>
          Home
        </Link>
        <Link to="/register" className={styles.navLink}>
          Cadastrar Usuário
        </Link>
        <Link to="/" className={styles.navLink}>
          Sair
        </Link>
      </nav>
    </header>
  );
};

export default Header;
