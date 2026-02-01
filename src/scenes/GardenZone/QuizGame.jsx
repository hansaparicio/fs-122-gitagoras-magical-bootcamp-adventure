import { useState, useMemo, useEffect, useCallback } from 'react';
import GameLayout from './components/GameLayout';
import QuizHeader from './components/QuizHeader';
import QuizContent from './components/QuizContent';
import CompletionScreen from './components/CompletionScreen';
import GameOverScreen from './components/GameOverScreen';
import LoadingScreen from './components/LoadingScreen';
import WizardIntro from './components/WizardIntro';
import { generateQuestions, getFallbackQuestions } from './services/questionService';
import './QuizGame.css';

const INITIAL_LIVES = 3;

const QuizGame = ({ onExit }) => {
  const [questions, setQuestions] = useState([]);
  const [isLoadingQuestions, setIsLoadingQuestions] = useState(true);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(INITIAL_LIVES);
  const [selectedOption, setSelectedOption] = useState(null);
  const [gameStatus, setGameStatus] = useState('intro'); // intro, loading, playing, completed, gameOver
  const [isAnswerRevealed, setIsAnswerRevealed] = useState(false);
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [timerReset, setTimerReset] = useState(0);
  const [gameOverReason, setGameOverReason] = useState('');
  const [incorrectAnswers, setIncorrectAnswers] = useState(0);

  // Generar estrellas de fondo una sola vez
  const stars = useMemo(() =>
    Array.from({ length: 80 }, (_, id) => ({
      id,
      top: Math.random() * 100,
      left: Math.random() * 100,
      delay: Math.random() * 3,
      size: Math.random() * 1.4 + 0.6
    })),
    []
  );

  // Cargar preguntas cuando se inicia el juego después de la intro
  const loadQuestionsAndStart = async () => {
    setIsLoadingQuestions(true);
    setGameStatus('loading');

    try {
      const generatedQuestions = await generateQuestions(10);
      setQuestions(generatedQuestions);
      setGameStatus('playing');
      setIsTimerActive(true);
    } catch (error) {
      console.error('Error cargando preguntas, usando fallback:', error);
      setQuestions(getFallbackQuestions());
      setGameStatus('playing');
      setIsTimerActive(true);
    } finally {
      setIsLoadingQuestions(false);
    }
  };

  const currentQuestion = questions[currentQuestionIndex];
  const totalQuestions = questions.length;
  const isCorrectAnswer = selectedOption === currentQuestion?.correct;

  // Manejar pérdida de tiempo
  const handleTimeUp = useCallback(() => {
    if (isAnswerRevealed || gameStatus !== 'playing') return;

    setIsTimerActive(false);
    setIsAnswerRevealed(true);

    const newLives = lives - 1;
    setLives(newLives);
    setIncorrectAnswers(prev => prev + 1);

    if (newLives <= 0) {
      setGameStatus('gameOver');
      setGameOverReason('Has perdido la batalla');
    } else {
      setTimeout(() => {
        moveToNextQuestion();
      }, 1500);
    }
  }, [isAnswerRevealed, lives, gameStatus]);

  const moveToNextQuestion = () => {
    const nextIndex = currentQuestionIndex + 1;

    if (nextIndex >= totalQuestions) {
      setGameStatus('completed');
      setIsTimerActive(false);
    } else {
      setCurrentQuestionIndex(nextIndex);
      setSelectedOption(null);
      setIsAnswerRevealed(false);
      setGameStatus('playing');
      setTimerReset(prev => prev + 1);
      setIsTimerActive(true);
    }
  };

  const handleAnswerSelect = (option) => {
    if (isAnswerRevealed) return;

    setIsTimerActive(false);
    setSelectedOption(option);
    setIsAnswerRevealed(true);

    if (option === currentQuestion.correct) {
      setScore(prevScore => prevScore + 1);
    } else {
      const newLives = lives - 1;
      setLives(newLives);
      setIncorrectAnswers(prev => prev + 1);

      if (newLives <= 0) {
        setGameStatus('gameOver');
        setGameOverReason('Has perdido la batalla');
        return;
      }
    }

    // Esperar antes de avanzar a la siguiente pregunta
    setTimeout(() => {
      moveToNextQuestion();
    }, 1500);
  };

  const resetGame = async () => {
    setIsLoadingQuestions(true);
    setGameStatus('loading');
    setCurrentQuestionIndex(0);
    setScore(0);
    setLives(INITIAL_LIVES);
    setSelectedOption(null);
    setIsAnswerRevealed(false);
    setIsTimerActive(false);
    setTimerReset(0);
    setIncorrectAnswers(0);
    setGameOverReason('');

    try {
      const generatedQuestions = await generateQuestions(10);
      setQuestions(generatedQuestions);
      setGameStatus('playing');
      setIsTimerActive(true);
    } catch (error) {
      console.error('Error recargando preguntas:', error);
      setQuestions(getFallbackQuestions());
      setGameStatus('playing');
      setIsTimerActive(true);
    } finally {
      setIsLoadingQuestions(false);
    }
  };

  // Mostrar intro del mago
  if (gameStatus === 'intro') {
    return <WizardIntro stars={stars} onStart={loadQuestionsAndStart} />;
  }

  // Mostrar pantalla de carga
  if (isLoadingQuestions || gameStatus === 'loading') {
    return <LoadingScreen stars={stars} />;
  }

  // Mostrar pantalla de Game Over
  if (gameStatus === 'gameOver') {
    return (
      <GameOverScreen
        score={score}
        total={totalQuestions}
        stars={stars}
        onReset={resetGame}
        onExit={onExit}
        reason={gameOverReason}
      />
    );
  }

  // Mostrar pantalla de completado (victoria)
  if (gameStatus === 'completed') {
    return (
      <CompletionScreen
        score={score}
        total={totalQuestions}
        stars={stars}
        onReset={resetGame}
        onExit={onExit}
      />
    );
  }

  return (
    <GameLayout stars={stars}>
      <QuizHeader
        score={score}
        currentQuestion={currentQuestionIndex + 1}
        totalQuestions={totalQuestions}
        lives={lives}
        onTimeUp={handleTimeUp}
        isTimerActive={isTimerActive}
        timerReset={timerReset}
      />

      <QuizContent
        question={currentQuestion}
        questionNumber={currentQuestionIndex + 1}
        totalQuestions={totalQuestions}
        selectedOption={selectedOption}
        isAnswerRevealed={isAnswerRevealed}
        isCorrectAnswer={isCorrectAnswer}
        onAnswerSelect={handleAnswerSelect}
      />
    </GameLayout>
  );
};

export default QuizGame;
