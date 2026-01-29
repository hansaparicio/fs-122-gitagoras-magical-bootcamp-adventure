import { useMemo, useState, useEffect } from 'react';
import GameContainer from './GameContainer';
import GameHeader from './GameHeader';
import ScorePanel from './ScorePanel';
import Cauldron from './Cauldron';
import QuestionCard from './QuestionCard';
import OptionButton from './OptionButton';
import FeedbackMessage from './FeedbackMessage';
import CompletionScreen from './CompletionScreen';
import './QuizzGame.css';

const STAR_COUNT = 80;
const REVEAL_DELAY = 1100;
const TOTAL_QUESTIONS = 10;
const MAX_WRONG_ANSWERS = 3;

const GRADIENTS = [
    'from-purple-500 via-fuchsia-500 to-pink-500',
    'from-sky-500 via-blue-500 to-cyan-400',
    'from-emerald-500 via-green-500 to-lime-400',
    'from-amber-400 via-orange-500 to-rose-500',
    'from-rose-500 via-red-500 to-orange-400',
    'from-indigo-500 via-purple-500 to-pink-500',
    'from-teal-500 via-cyan-500 to-blue-400',
    'from-yellow-400 via-amber-500 to-orange-500',
    'from-pink-500 via-rose-500 to-red-400',
    'from-violet-500 via-fuchsia-500 to-purple-400'
];

const generateQuestionWithAI = async (questionNumber, previousTopics = [], sessionId = '') => {
    try {
        const apiKey = import.meta.env.VITE_MISTRAL_API_KEY;

        if (!apiKey) {
            throw new Error('API key no configurada');
        }

        const topicsUsed = previousTopics.length > 0
            ? `Ya se usaron estos temas: ${previousTopics.join(', ')}. `
            : '';




        const response = await fetch('https://api.mistral.ai/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                model: 'mistral-tiny-latest',
                messages: [
                    {
                        role: 'system',
                        content: 'Eres un generador de preguntas de HTML para un quiz. Debes responder ÚNICAMENTE con un objeto JSON válido con esta estructura exacta: {"prompt":"[pregunta con ___ para completar]","options":["opción1","opción2","opción3","opción4"],"correct":"[respuesta correcta]","topic":"[tema de la pregunta]"}. La pregunta debe ser sobre HTML, nivel básico. NO agregues texto adicional, SOLO el JSON. Cada pregunta debe ser sobre un tema COMPLETAMENTE DIFERENTE. Sé creativo y variado.'
                    },
                    {
                        role: 'user',
                        content: `${topicsUsed}Genera una pregunta ÚNICA número ${questionNumber} sobre HTML. Debe ser sobre un tema totalmente diferente a los anteriores. Varía mucho. Temas posibles: etiquetas básicas (h1-h6, p, div, span, br, hr), atributos (id, class, src, href, alt, title, style), formularios (input, button, form, label, select, textarea), listas (ul, ol, li, dl), tablas (table, tr, td, th, thead, tbody), semántica (header, footer, nav, article, section, aside, main), multimedia (img, video, audio, source), meta tags, enlaces (a, target, rel), estructura (html, head, body, DOCTYPE). Responde SOLO con JSON válido: {"prompt":"pregunta con ___ para completar","options":["opción1","opción2","opción3","opción4"],"correct":"respuesta correcta","topic":"tema"}`
                    }
                ],
                max_tokens: 180,
                temperature: 1.3,
                top_p: 0.95
            })
        });

        if (!response.ok) {
            throw new Error(`Error API: ${response.status}`);
        }

        const data = await response.json();

        if (!data.choices || !data.choices[0] || !data.choices[0].message) {
            throw new Error('Estructura de respuesta API incorrecta');
        }

        let content = data.choices[0].message.content.trim();
        content = content.replace(/```json\s*/g, '').replace(/```\s*/g, '').trim();

        const questionData = JSON.parse(content);
        const shuffledOptions = [...questionData.options].sort(() => Math.random() - 0.5);

        return {
            id: questionNumber,
            prompt: questionData.prompt,
            options: shuffledOptions,
            correct: questionData.correct,
            topic: questionData.topic || `Pregunta ${questionNumber}`,
            gradient: GRADIENTS[(questionNumber - 1) % GRADIENTS.length]
        };
    } catch (error) {
        console.error('Error generando pregunta:', error);
        const fallbackQuestions = [
            {
                prompt: 'El tag <div> se utiliza para crear un contenedor ___',
                options: ['genérico', 'de texto', 'de imagen', 'de enlace'],
                correct: 'genérico',
                topic: 'Contenedores'
            },
            {
                prompt: 'El atributo class se usa para aplicar ___',
                options: ['estilos CSS', 'enlaces', 'imágenes', 'videos'],
                correct: 'estilos CSS',
                topic: 'Atributos'
            },
            {
                prompt: 'La etiqueta <ul> crea una lista ___',
                options: ['desordenada', 'ordenada', 'de definiciones', 'de tablas'],
                correct: 'desordenada',
                topic: 'Listas'
            },
            {
                prompt: 'El tag <header> define el ___ de la página',
                options: ['encabezado', 'pie', 'contenido', 'lateral'],
                correct: 'encabezado',
                topic: 'Semántica'
            },
            {
                prompt: 'El atributo alt en <img> sirve para ___',
                options: ['texto alternativo', 'enlazar', 'estilo', 'tamaño'],
                correct: 'texto alternativo',
                topic: 'Multimedia'
            }
        ];

        const fallback = fallbackQuestions[(questionNumber - 1) % fallbackQuestions.length];
        const shuffledFallbackOptions = [...fallback.options].sort(() => Math.random() - 0.5);

        return {
            id: questionNumber,
            prompt: fallback.prompt,
            options: shuffledFallbackOptions,
            correct: fallback.correct,
            topic: fallback.topic,
            gradient: GRADIENTS[(questionNumber - 1) % GRADIENTS.length]
        };
    }
};

const QuizzGame = ({ onExit }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [selected, setSelected] = useState(null);
    const [status, setStatus] = useState('loading');
    const [questions, setQuestions] = useState([]);
    const [wrongAnswers, setWrongAnswers] = useState(0);
    const [sessionId] = useState(() => Math.random().toString(36).substring(7));

    const stars = useMemo(
        () =>
            Array.from({ length: STAR_COUNT }, (_, id) => ({
                id,
                top: Math.random() * 100,
                left: Math.random() * 100,
                delay: Math.random() * 3,
                size: Math.random() * 1.4 + 0.6
            })),
        []
    );

    useEffect(() => {
        const loadQuestions = async () => {
            setStatus('loading');
            const generatedQuestions = [];
            const usedTopics = [];

            for (let i = 1; i <= TOTAL_QUESTIONS; i++) {
                const question = await generateQuestionWithAI(i, usedTopics, sessionId);
                generatedQuestions.push(question);
                if (question.topic) {
                    usedTopics.push(question.topic);
                }
            }

            setQuestions(generatedQuestions);
            setStatus('question');
        };

        loadQuestions();
    }, []);

    const question = questions[currentIndex];
    const total = questions.length || TOTAL_QUESTIONS;
    const answered = status === 'question' ? currentIndex : Math.min(currentIndex + 1, total);
    const progress = (answered / total) * 100;
    const correct = selected && question ? selected === question.correct : false;

    const handleAnswer = option => {
        if (status !== 'question' || !question) return;
        setSelected(option);
        const isCorrect = option === question.correct;

        if (isCorrect) {
            setScore(value => value + 1);
        } else {
            setWrongAnswers(value => value + 1);
        }

        setStatus('revealed');
        window.setTimeout(() => {
            setSelected(null);
            const next = currentIndex + 1;
            const newWrongCount = isCorrect ? wrongAnswers : wrongAnswers + 1;

            if (newWrongCount >= MAX_WRONG_ANSWERS) {
                setStatus('complete');
            } else if (next >= TOTAL_QUESTIONS) {
                setStatus('complete');
            } else {
                setCurrentIndex(next);
                setStatus('question');
            }
        }, REVEAL_DELAY);
    };

    const reset = async () => {
        setCurrentIndex(0);
        setScore(0);
        setSelected(null);
        setWrongAnswers(0);
        setStatus('loading');

        const generatedQuestions = [];
        const usedTopics = [];
        const newSessionId = Math.random().toString(36).substring(7);

        for (let i = 1; i <= TOTAL_QUESTIONS; i++) {
            const question = await generateQuestionWithAI(i, usedTopics, newSessionId);
            generatedQuestions.push(question);
            if (question.topic) {
                usedTopics.push(question.topic);
            }
        }

        setQuestions(generatedQuestions);
        setStatus('question');
    };

    if (status === 'loading' || !question) {
        return (
            <GameContainer stars={stars}>
                <div className="flex items-center justify-center min-h-screen">
                    <div className="text-center">
                        <div className="mb-4 text-4xl animate-pulse">🔮</div>
                        <p className="text-xl text-purple-300 font-display">
                            La Archimaga está preparando tus preguntas...
                        </p>
                    </div>
                </div>
            </GameContainer>
        );
    }

    if (status === 'complete') {
        return <CompletionScreen
            score={score}
            total={total}
            wrongAnswers={wrongAnswers}
            maxWrong={MAX_WRONG_ANSWERS}
            stars={stars}
            onReset={reset}
            onExit={onExit}
        />;
    }

    return (
        <GameContainer stars={stars}>
            <header className="rounded-[28px] border-[5px] border-purple-400/80 bg-slate-950/85 backdrop-blur-sm shadow-[0_0_36px_rgba(129,69,255,0.5)] px-4 py-5 md:px-8 md:py-6 flex flex-col gap-4">
                <GameHeader />
                <ScorePanel potionCount={score} scrollCount={currentIndex + 1} total={total} wrongAnswers={wrongAnswers} maxWrong={MAX_WRONG_ANSWERS} />
            </header>

            <main className="flex flex-col gap-5">
                <section className="rounded-[28px] border-[5px] border-purple-500/80 bg-slate-950/88 backdrop-blur-sm shadow-[0_0_40px_rgba(129,69,255,0.45)] px-4 py-4 md:px-8 md:py-5 flex flex-col gap-5 items-center">
                    <Cauldron />

                    <QuestionCard
                        questionNumber={currentIndex + 1}
                        total={total}
                        questionText={question.prompt.replace('___', '---')}
                    />

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-3xl">
                        {question.options.map(option => {
                            const isSelected = selected === option;
                            const isCorrect = status === 'revealed' && option === question.correct;
                            const isWrong = status === 'revealed' && isSelected && option !== question.correct;

                            return (
                                <OptionButton
                                    key={option}
                                    option={option}
                                    onClick={() => handleAnswer(option)}
                                    disabled={status !== 'question'}
                                    isSelected={isSelected}
                                    isCorrect={isCorrect}
                                    isWrong={isWrong}
                                />
                            );
                        })}
                    </div>

                    {status === 'revealed' && (
                        <FeedbackMessage isCorrect={correct} correctAnswer={question.correct} />
                    )}
                </section>
            </main>
        </GameContainer>
    );
};

export default QuizzGame;
