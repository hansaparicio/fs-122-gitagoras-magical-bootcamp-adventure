import React from 'react';
import PixelHeart from './PixelHeart';

const LivesDisplay = ({ lives }) => {
    return (
        <div className="lives-display">
            <span className="lives-label">Vidas:</span>
            <div className="lives-container">
                {Array.from({ length: 3 }, (_, index) => (
                    <PixelHeart
                        key={index}
                        isActive={index < lives}
                    />
                ))}
            </div>
        </div>
    );
};

export default LivesDisplay;
