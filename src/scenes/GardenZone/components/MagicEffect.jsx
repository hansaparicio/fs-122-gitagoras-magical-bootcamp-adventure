import React from 'react';
import '../QuizGame.css';

const MagicEffect = ({ isCorrect }) => {
    return (
        <div className={`magic-effect ${isCorrect ? 'correct-effect' : 'wrong-effect'}`}>
            <div className="magic-burst"></div>
            <div className="magic-pulse"></div>
            {[...Array(12)].map((_, i) => (
                <div
                    key={i}
                    className="magic-spark"
                    style={{
                        '--angle': `${i * 30}deg`,
                        '--delay': `${i * 0.05}s`
                    }}
                ></div>
            ))}
        </div>
    );
};

export default MagicEffect;
