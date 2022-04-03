import React from "react";

import { useNavigate } from "react-router-dom";

import illustration from "../assets/home-illustration.svg";
import styles from "../styles/home-page.module.css";

export const Home = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <h1>Gerencie seus alunos de forma fácil!</h1>
      <div className={styles.product}>
        <div className={styles.productTexts}>
          <p>
            Cadastre alunos utilizando nosso formulário e{" "}
            <strong style={{ color: "#23AEBA" }}>
              obtenha resposta de aprovação em tempo real
            </strong>{" "}
            e muito mais!
          </p>
          <p>
            Obtenha relatórios e ordene da{" "}
            <strong style={{ color: "#23AEBA" }}>forma que preferir.</strong>
          </p>
          <button
            id={styles.btnProduct}
            onClick={() => navigate("./cadastrar-aluno")}
          >
            Acesse o formulário
          </button>
        </div>
        <img src={illustration} alt="ilustração" id={styles.illustration} />
      </div>
    </div>
  );
};
