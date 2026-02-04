import React from 'react';
import '../styles/PixelArtOptionButton.css';

const PixelArtOptionButton = ({
    option,
    isSelected,
    isCorrect,
    isWrong,
    disabled,
    onClick
}) => {
    const getButtonClass = () => {
        let classes = 'pixel-option-button';
        
        if (disabled) {
            classes += ' pixel-option-disabled';
        }
        
        if (isWrong) {
            classes += ' pixel-option-wrong';
        } else if (isCorrect) {
            classes += ' pixel-option-correct';
        } else if (isSelected) {
            classes += ' pixel-option-selected';
        }
        
        return classes;
    };

    return (
        <button
            className={getButtonClass()}
            onClick={onClick}
            disabled={disabled}
            aria-pressed={isSelected}
        >
            <span className="pixel-button-text">{option}</span>
            <span className="pixel-button-indicator">
                {isCorrect && '✓'}
                {isWrong && '✗'}
            </span>
        </button>
    );
};

export default PixelArtOptionButton;
