import React from 'react';
import StarField from './StarField';
import cristalImg from '../assets/bola de cristal.png';
import pocionImg from '../assets/pocion.png';
import pergaminoImg from '../assets/pergamino.png';
import laboratorioImg from '../assets/laboratorio.png';

const CompletionScreen = ({ score, total, stars, onReset, onExit }) => {
  const percentage = (score / total) * 100;

  let message = 'Practica más hechizos para perfeccionarte.';
  if (score === total) {
    message = 'Dominaste cada definición.';
  } else if (percentage >= 70) {
    message = 'Gran trabajo, sigue puliendo tu magia.';
  }

  return (
    <div className="completion-screen" style={{ backgroundImage: `url(${laboratorioImg})` }}>
      <div className="completion-overlay"></div>
      <StarField stars={stars} />

      <div className="completion-content">
        <div className="completion-card">
          <div className="completion-header">
            <img src={cristalImg} alt="Cristal" className="completion-icon" />
            <h2 className="completion-title">Ritual completado</h2>
            <img src={cristalImg} alt="Cristal" className="completion-icon" />
          </div>

          <p className="completion-label">Puntuación</p>
          <p className="completion-score">{score}/{total}</p>
          <p className="completion-message">{message}</p>

          <div className="completion-stats">
            <div className="stat-item">
              <img src={pocionImg} alt="Poción" className="stat-icon" />
              <div>
                <p className="stat-label">Pociones</p>
                <p className="stat-value">{score}</p>
              </div>
            </div>
            <div className="stat-item">
              <img src={pergaminoImg} alt="Pergamino" className="stat-icon" />
              <div>
                <p className="stat-label">Pergaminos</p>
                <p className="stat-value">{total}</p>
              </div>
            </div>
          </div>

          <button className="completion-button completion-button-reset" onClick={onReset}>
            ↻ Reiniciar
          </button>

          {onExit && (
            <button className="completion-button completion-button-exit" onClick={onExit}>
              ✕ Salir
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CompletionScreen;
