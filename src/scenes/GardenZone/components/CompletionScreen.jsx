import React from 'react';
import StarField from './StarField';
import wizardImg from '../assets/batalla hans.png';
import victoryImg from '../assets/gitagoras-victory.png';

const CompletionScreen = ({ score, total, stars, onReset, onExit }) => {
  const percentage = (score / total) * 100;

  let message = '¡Veo que tienes potencial! Sigue estudiando para dominar el arte del HTML.';
  if (score === total) {
    message = '¡IMPRESIONANTE! Has demostrado un dominio absoluto sobre HTML. Incluso yo, el Calvo Malvado, debo reconocer tu sabiduría. ¡Eres digno de continuar tu aventura!';
  } else if (percentage >= 70) {
    message = 'Bien hecho, joven aprendiz. Tu conocimiento es sólido. El mago reconoce tu poder.';
  }

  return (
    <div className="completion-screen" style={{ backgroundImage: `url(${victoryImg})` }}>
      <div className="completion-overlay"></div>
      <StarField stars={stars} />

      <div className="completion-content">
        <div className="completion-card">
          <div className="completion-header">
            <h2 className="completion-title">¡DESAFÍO SUPERADO!</h2>
          </div>

          <p className="completion-label">Puntuación</p>
          <p className="completion-score">{score}/{total}</p>
          <p className="completion-message">{message}</p>

          <button className="completion-button completion-button-reset" onClick={onReset}>
            ↻ Reintentar el Desafío
          </button>

          {onExit && (
            <button className="completion-button completion-button-exit" onClick={onExit}>
              → Volver al Mapa
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CompletionScreen;
