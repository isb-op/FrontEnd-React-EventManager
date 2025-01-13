import React, { useState, useContext } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { AuthContext } from "../../components/context/AuthContext";
import styles from "./LoginPage.module.css";
import image from "../../assets/1.png";

const LoginPage = () => {
  const { signed, signIn } = useContext(AuthContext); 
  const [password, setPassword] = useState("");
  const [login, setLogin] = useState("");
  const [rememberUser, setRememberUser] = useState(false); 
  const navigate = useNavigate();

  const handleSignIn = async (e) => {
    e.preventDefault();
    const data = {
      login,
      password,
    }
    try {
      await signIn(data); 
    } catch (error) {
      console.error("Erro ao tentar realizar login:", error);
      alert("Falha no login. Verifique suas credenciais.");
    }
  };

  if (signed) {
    return <Navigate to="/events" />;
  }

  return (
    <div className={styles.container}>
      <div className={styles.boxTitle}>
        <img src={image} alt="Login" className={styles.loginImage} />
        <p>Bem-vindo ao Sistema de Gerenciamento de Eventos</p>
      </div>
      <div className={styles.boxLogin}>
        <form onSubmit={handleSignIn}>
          <div className={styles.boxInput}>
            <h2>Bem-vindo(a), administrador!</h2>
            <input
              type="text"
              placeholder="example@email.com"
              value={login}
              onChange={(e) => setLogin(e.target.value)}
              required 
            />
            <input
              type="password"
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required 
            />
            <label className={styles.boxLabel}>
              <input
                type="checkbox"
                checked={rememberUser} 
                onChange={(e) => setRememberUser(e.target.checked)}
              />
              <p>Lembrar usuário</p>
            </label>
          </div>
          <div className={styles.buttonBox}>
            <button type="submit" className={styles.buttonLoginPage}>
              Entrar
            </button>
            <p>Não possui login?</p>
            <button
              type="button"
              className={styles.buttonLoginPage}
              onClick={() => navigate("/register")}
            >
              Cadastrar-se
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
