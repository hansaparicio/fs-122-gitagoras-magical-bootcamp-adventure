import React from 'react';

const QuestionCard = ({ questionNumber, totalQuestions, questionText }) => {
    return (
        <div className="question-card">
            <p className="question-number">Pregunta {questionNumber} de {totalQuestions}</p>
            <h2 className="question-text">{questionText}</h2>
        </div>
    );
};

export default QuestionCard;
