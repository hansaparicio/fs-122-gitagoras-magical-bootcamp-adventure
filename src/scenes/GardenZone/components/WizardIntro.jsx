import React, { useState, useEffect } from 'react';
import '../QuizGame.css';

const INTRO_TEXT = "El calvo malvado quiere comprobar los conocimientos que has adquirido sobre html demuéstrale lo que sabes.";

const WizardIntro = ({ onStart, stars }) => {
    const [displayedText, setDisplayedText] = useState("");
    const [isComplete, setIsComplete] = useState(false);

    useEffect(() => {
        let index = 0;
        const interval = setInterval(() => {
            if (index < INTRO_TEXT.length) {
                setDisplayedText(INTRO_TEXT.slice(0, index + 1));
                index++;
            } else {
                setIsComplete(true);
                clearInterval(interval);
            }
        }, 40);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="wizard-intro-container">
            <div className="wizard-intro-overlay"></div>
            <div className="star-field">
                {stars.map(star => (
                    <div
                        key={star.id}
                        className="star"
                        style={{
                            top: `${star.top}%`,
                            left: `${star.left}%`,
                            animationDelay: `${star.delay}s`,
                            width: `${star.size}px`,
                            height: `${star.size}px`
                        }}
                    />
                ))}
            </div>

            <div className="wizard-intro-content">
                <div className="wizard-dialogue-box">
                    <div className="wizard-dialogue-header">
                        <span className="wizard-name">El Calvo Malvado</span>
                    </div>
                    <p className="wizard-dialogue-text">{displayedText}</p>
                    {isComplete && (
                        <button
                            className="wizard-start-btn"
                            onClick={onStart}
                        >
                            ACEPTAR EL DESAFÍO
                        </button>
                    )}
                </div>
            </div>

            <div className="wizard-intro-effects">
                <div className="magic-particle particle-1"></div>
                <div className="magic-particle particle-2"></div>
                <div className="magic-particle particle-3"></div>
                <div className="magic-particle particle-4"></div>
            </div>
        </div>
    );
};

export default WizardIntro;
