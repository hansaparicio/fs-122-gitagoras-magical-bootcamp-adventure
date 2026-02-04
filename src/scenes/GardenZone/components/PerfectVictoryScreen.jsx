import React from 'react';
import StarField from './StarField';
import gitagorasWinsImg from '../assets/Gitagoras Wins.png';
import '../styles/PerfectVictoryScreen.css';

const PerfectVictoryScreen = ({ score, total, stars, onReset, onExit }) => {
  return (
    <div className="perfect-victory-screen" style={{ backgroundImage: `url(${gitagorasWinsImg})` }}>
      <div className="perfect-victory-overlay"></div>
      <StarField stars={stars} />

      <div className="perfect-victory-content">
        <div className="perfect-victory-card">
          <div className="perfect-victory-header">
            <h2 className="perfect-victory-title">¡VICTORIA PERFECTA!</h2>
            <p className="perfect-victory-subtitle">¡Sin perder una sola vida!</p>
          </div>

          <p className="perfect-victory-label">Puntuación Perfecta</p>
          <p className="perfect-victory-score">{score}/{total}</p>
          <p className="perfect-victory-message">
            ¡EXTRAORDINARIO! ¡Has demostrado un dominio absoluto! Pitágoras reconoce tu sabiduría suprema. ¡Eres un verdadero maestro del HTML!
          </p>

          <button className="perfect-victory-button perfect-victory-button-reset" onClick={onReset}>
            ↻ Reintentar el Desafío
          </button>

          {onExit && (
            <button className="perfect-victory-button perfect-victory-button-exit" onClick={onExit}>
              → Volver al Mapa
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default PerfectVictoryScreen;
