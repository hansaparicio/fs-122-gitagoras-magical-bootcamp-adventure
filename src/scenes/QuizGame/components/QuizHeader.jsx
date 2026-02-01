import React from 'react';
import LivesDisplay from './LivesDisplay';
import QuizTimer from './QuizTimer';

const QuizHeader = ({
    score,
    currentQuestion,
    totalQuestions,
    lives,
    onTimeUp,
    isTimerActive,
    timerReset
}) => {
    return (
        <header className="quiz-header">
            <div className="quiz-title-container">
                <h1 className="quiz-title">Desafío del Calvo Malvado</h1>
            </div>

            <div className="quiz-info-panel">
                <div className="quiz-score-panel">
                    <div className="score-item">
                        <span>Pregunta {currentQuestion} / {totalQuestions}</span>
                    </div>
                </div>

                <div className="quiz-status-panel">
                    <LivesDisplay lives={lives} />
                    <QuizTimer
                        onTimeUp={onTimeUp}
                        isActive={isTimerActive}
                        onReset={timerReset}
                    />
                </div>
            </div>
        </header>
    );
};

export default QuizHeader;
