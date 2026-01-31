import React from 'react';

const FeedbackMessage = ({ isCorrect, correctAnswer }) => {
    return (
        <div className={`feedback-message ${isCorrect ? 'feedback-correct' : 'feedback-wrong'}`}>
            {isCorrect ? 'Hechizo correcto' : `Respuesta correcta: ${correctAnswer}`}
        </div>
    );
};

export default FeedbackMessage;
