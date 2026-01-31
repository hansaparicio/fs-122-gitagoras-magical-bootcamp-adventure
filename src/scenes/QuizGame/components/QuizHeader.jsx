import React from 'react';
import cristalImg from '../assets/bola de cristal.png';
import pocionImg from '../assets/pocion.png';
import pergaminoImg from '../assets/pergamino.png';
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
                <img src={cristalImg} alt="Cristal" className="quiz-icon pixelated" />
                <h1 className="quiz-title">Laboratorio de Definiciones</h1>
                <img src={cristalImg} alt="Cristal" className="quiz-icon pixelated" />
            </div>

            <div className="quiz-info-panel">
                <div className="quiz-score-panel">
                    <div className="score-item">
                        <img src={pocionImg} alt="Poción" className="score-icon pixelated" />
                        <span>Pociones! {score}</span>
                    </div>
                    <div className="score-item">
                        <img src={pergaminoImg} alt="Pergamino" className="score-icon pixelated" />
                        <span>Pergamino! {currentQuestion} / {totalQuestions}</span>
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
