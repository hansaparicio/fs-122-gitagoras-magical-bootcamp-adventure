import React from 'react';

const OptionButton = ({ option, isSelected, isCorrect, isWrong, disabled, onClick }) => {
    let className = 'option-button';

    if (isCorrect) className += ' option-correct';
    else if (isWrong) className += ' option-wrong';
    else if (isSelected) className += ' option-selected';

    if (disabled) className += ' option-disabled';

    return (
        <button
            className={className}
            onClick={onClick}
            disabled={disabled}
            type="button"
        >
            <span className="option-text">{option}</span>
            <span className="option-indicator">
                {isCorrect && '✓'}
                {isWrong && '✗'}
            </span>
        </button>
    );
};

export default OptionButton;
