import React from 'react';
import QuestionCard from './QuestionCard';
import OptionButton from './OptionButton';
import FeedbackMessage from './FeedbackMessage';
import MagicEffect from './MagicEffect';

const QuizContent = ({
    question,
    questionNumber,
    totalQuestions,
    selectedOption,
    isAnswerRevealed,
    isCorrectAnswer,
    onAnswerSelect
}) => {
    if (!question) return null;

    return (
        <main className="quiz-content-main">
            {isAnswerRevealed && <MagicEffect isCorrect={isCorrectAnswer} />}

            <section className="quiz-question-section">

                <QuestionCard
                    questionNumber={questionNumber}
                    totalQuestions={totalQuestions}
                    questionText={question.prompt.replace('___', '---')}
                />

                <div className="quiz-options-grid">
                    {question.options.map((option) => {
                        const isSelected = selectedOption === option;
                        const isCorrect = isAnswerRevealed && option === question.correct;
                        const isWrong = isAnswerRevealed && isSelected && !isCorrect;

                        return (
                            <OptionButton
                                key={option}
                                option={option}
                                isSelected={isSelected}
                                isCorrect={isCorrect}
                                isWrong={isWrong}
                                disabled={isAnswerRevealed}
                                onClick={() => onAnswerSelect(option)}
                            />
                        );
                    })}
                </div>

                {isAnswerRevealed && (
                    <FeedbackMessage
                        isCorrect={isCorrectAnswer}
                        correctAnswer={question.correct}
                    />
                )}
            </section>
        </main>
    );
};

export default QuizContent;
