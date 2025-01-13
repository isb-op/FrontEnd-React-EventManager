import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import styles from "./RegisterPage.module.css";

const Register = () => {
  const [name, setName] = useState("");
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/account/sign-up", { name, login, password, passwordConfirmation });
      alert("Cadastro realizado com sucesso!");
      navigate("/");
    } catch (error) {
      console.error("Erro no cadastro:", error.response?.data || error.message);
      alert("Falha no cadastro. Verifique os dados.");
    }
  };
  const handleBack = () => {
    navigate(-1); 
  };

  return (
    <div className={styles.container}>
        <form onSubmit={handleSubmit}>
          <div className={styles.boxTitle}>
            <h1>Cadastre-se</h1>
          </div>

            <div className={styles.boxInput}>

              <input
                  type="text"
                  placeholder="Nome"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
              />
              <input
                  type="text"
                  placeholder="example@email.com"
                  value={login}
                  onChange={(e) => setLogin(e.target.value)}
              />
              <input
                  type="password"
                  placeholder="********"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
              />
              <input
                  type="password"
                  placeholder="********"
                  value={passwordConfirmation}
                  onChange={(e) => setPasswordConfirmation(e.target.value)}
              />
            
              <div className={styles.boxButton}>
                <button type="submit" className={styles.buttonRegister}>Cadastrar-se</button>
                <button type="button" onClick={handleBack} className={styles.buttonBack}>Voltar</button>
              </div>         
            </div>
          </form>
    </div>
  );
};

export default Register;
