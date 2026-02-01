import React from 'react';
import StarField from './StarField';
import wizardImg from '../assets/batalla hans.png';

const GameLayout = ({ stars, children }) => {
    return (
        <div className="quiz-game-container">
            <div className="quiz-game-background" style={{ backgroundImage: `url(${wizardImg})` }}>
                <div className="quiz-game-overlay"></div>
                <StarField stars={stars} />
                <div className="quiz-game-content">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default GameLayout;
