import React, { useEffect, useState } from 'react';
import sandImg from '../../../assets/images/SandHourglass.png';

const TIMER_DURATION = 30; // 30 segundos por pregunta

const QuizTimer = ({ onTimeUp, isActive, onReset }) => {
    const [timeLeft, setTimeLeft] = useState(TIMER_DURATION);

    useEffect(() => {
        if (onReset) {
            setTimeLeft(TIMER_DURATION);
        }
    }, [onReset]);

    useEffect(() => {
        if (!isActive) return;

        if (timeLeft <= 0) {
            onTimeUp();
            return;
        }

        const timer = setInterval(() => {
            setTimeLeft(prev => {
                if (prev <= 1) {
                    clearInterval(timer);
                    onTimeUp();
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [timeLeft, isActive, onTimeUp]);

    const timerClass =
        timeLeft <= 5 ? 'danger' :
            timeLeft <= 10 ? 'warning' : '';

    return (
        <div className={`quiz-timer ${timerClass}`}>
            <img src={sandImg} alt="Reloj de arena" className="timer-icon pixelated" />
            <span className="timer-text">{timeLeft}s</span>
        </div>
    );
};

export default QuizTimer;
