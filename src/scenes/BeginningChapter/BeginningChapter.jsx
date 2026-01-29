import { useEffect, useState } from "react";
import "./BeginningChapter.css";
import BeginningBg from "../../assets/images/BeginningChapterImage.png";
import MagicScroll from "../../assets/images/MagicScroll.png";
import html2canvas from "html2canvas";

const INTRO_TEXT = `Aquí comienza tu viaje hacia el mundo mágico del código.

No tengas miedo, como todo en la vida, siempre hay una primera vez.

¡Ánimo y a por todas, joven aprendiz!`;

const DIALOGUES = [
    `Espero que la llegada no te haya sentado mal. A veces durante un teletransporte es normal
encontrarse un poco mareado. ¡Bienvenido, joven aprendiz, a la academia del código!`,
    `A lo largo de tu estancia aquí aprenderás los conceptos básicos de la magia de la programación.
Lenguajes, símbolos y elementos que dan vida a la web.`,
    `Por cierto… qué malos modales los míos.
Me presento, soy el gran mago Gitágoras, director de esta academia. Mi mayor orgullo es compartir mi sabiduría con futuros magos del código como tú`,
    `Pero dejemos las charlas pesadas para más tarde.
Cuéntame algo sobre ti.`
];

const QUESTIONS = [
    { type: "text", text: "¿Cómo te llamas?" },
    {
        type: "options",
        text: "¿Cuántos años tienes?",
        options: ["Menos de 18 años", "Entre 18 y 30 años", "Más de 30 años", "Prefiero no decirlo"]
    },
    {
        type: "options",
        text: "¿Cómo conociste la existencia de la academia?",
        options: ["Por pura casualidad", "Me hablaron de ella otros magos", "La encontré buscando aprender"]
    },
    {
        type: "options",
        text: "¿Cuál es tu objetivo mientras estudies en la academia?",
        options: [
            "Quiero aprender desde cero",
            "Ya sé un poco, pero quiero mejorar",
            "Me gusta crear cosas y quiero entender cómo funcionan",
            "No lo sé… pero algo me ha llamado hasta aquí"
        ]
    },
    {
        type: "options",
        text: "Debo advertirte que esta magia conlleva un aprendizaje denso. ¿Estarás dispuesto a no juzgarte cuando te equivoques?",
        options: ["Sí, seré paciente", "Sí, aunque a veces me cueste", "No estoy seguro, pero lo intentaré"]
    }
];

const BeginningChapter = ({ onComplete }) => {
    const [phase, setPhase] = useState("blackIn");
    const [dialogIndex, setDialogIndex] = useState(0);
    const [typedText, setTypedText] = useState("");
    const [charIndex, setCharIndex] = useState(0);
    const [isTyping, setIsTyping] = useState(false);

    const [showQuestions, setShowQuestions] = useState(false);
    const [questionIndex, setQuestionIndex] = useState(0);
    const [typedQuestion, setTypedQuestion] = useState("");
    const [typedOptions, setTypedOptions] = useState([]);
    const [answers, setAnswers] = useState([]);
    const [playerName, setPlayerName] = useState("");
    const [optionsVisible, setOptionsVisible] = useState(false);

    const [finalDialog, setFinalDialog] = useState(false);
    const [typedFinalDialog, setTypedFinalDialog] = useState("");
    const [scrollTextVisible, setScrollTextVisible] = useState(false);
    const [scrollVisible, setScrollVisible] = useState(false);

    useEffect(() => {
        let t1, t2, t3, t4;
        if (phase === "blackIn") t1 = setTimeout(() => setPhase("textIn"), 2000);
        if (phase === "textIn") t2 = setTimeout(() => setPhase("textHold"), 2000);
        if (phase === "textHold") t3 = setTimeout(() => setPhase("textOut"), 6000);
        if (phase === "textOut") t4 = setTimeout(() => setPhase("showScene"), 3000);
        return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4); };
    }, [phase]);

    useEffect(() => {
        if (phase !== "showScene" || showQuestions) return;
        setTypedText("");
        setCharIndex(0);
        setIsTyping(true);
        const interval = setInterval(() => {
            setCharIndex(prev => {
                const next = prev + 1;
                setTypedText(DIALOGUES[dialogIndex].slice(0, next));
                if (next >= DIALOGUES[dialogIndex].length) {
                    clearInterval(interval);
                    setIsTyping(false);
                }
                return next;
            });
        }, 30);
        return () => clearInterval(interval);
    }, [dialogIndex, phase, showQuestions]);

    useEffect(() => {
        if (!showQuestions || finalDialog) return;
        setTypedQuestion("");
        setTypedOptions([]);
        setOptionsVisible(false);
        let q = QUESTIONS[questionIndex];
        let charIdx = 0;
        const questionInterval = setInterval(() => {
            charIdx++;
            setTypedQuestion(q.text.slice(0, charIdx));
            if (charIdx >= q.text.length) {
                clearInterval(questionInterval);
                setOptionsVisible(true);
                if (q.type === "options") {
                    const emptyOptions = Array(q.options.length).fill("");
                    setTypedOptions(emptyOptions);
                    q.options.forEach((opt, idx) => {
                        let c = 0;
                        const optInterval = setInterval(() => {
                            c++;
                            setTypedOptions(prev => {
                                const copy = [...prev];
                                copy[idx] = opt.slice(0, c);
                                return copy;
                            });
                            if (c >= opt.length) clearInterval(optInterval);
                        }, 20);
                    });
                }
            }
        }, 30);
        if (q.type === "text") setOptionsVisible(true);
    }, [questionIndex, showQuestions, finalDialog]);

    const handleContinueDialog = () => {
        if (dialogIndex < DIALOGUES.length - 1) setDialogIndex(dialogIndex + 1);
        else setShowQuestions(true);
    };

    const handleAnswer = (option) => {
        if (QUESTIONS[questionIndex].type === "text") setPlayerName(option);
        setAnswers([...answers, option]);
        if (questionIndex < QUESTIONS.length - 1) setQuestionIndex(questionIndex + 1);
        else setFinalDialog(true);
    };

    const handleSignScroll = () => {
        setFinalDialog(false);
        setShowQuestions(false);
        setPhase("pergamino");
    };

    useEffect(() => {
        if (finalDialog) {
            setTypedFinalDialog("");
            let text = "Perfecto, entonces firma este pergamino y serás oficialmente un nuevo alumno de nuestra prestigiosa academia";
            let i = 0;
            const interval = setInterval(() => {
                i++;
                setTypedFinalDialog(text.slice(0, i));
                if (i >= text.length) clearInterval(interval);
            }, 30);
        }
    }, [finalDialog]);

    useEffect(() => {
        if (phase === "pergamino") {
            setScrollTextVisible(false);
            setScrollVisible(false);
            const t1 = setTimeout(() => setScrollVisible(true), 50);
            const t2 = setTimeout(() => setScrollTextVisible(true), 500);
            return () => { clearTimeout(t1); clearTimeout(t2); };
        }
    }, [phase]);

    const handleDownload = () => {
        const element = document.getElementById("pergamino");
        html2canvas(element).then(canvas => {
            const link = document.createElement("a");
            link.download = `${playerName}_MagicScroll.png`;
            link.href = canvas.toDataURL("image/png");
            link.click();
            // Trigger completion after download
            setTimeout(() => {
                if (onComplete) onComplete();
            }, 1000);
        });
    };

    return (
        <div className="bc-root">
            <div className={`bc-black ${phase}`} />
            <div className={`bc-text ${phase}`}><p>{INTRO_TEXT}</p></div>
            <div className={`bc-scene ${phase}`} style={{ backgroundImage: `url(${BeginningBg})` }} />

            {phase === "showScene" && !showQuestions && (
                <div className="dialog-box">
                    <p className="dialog-text">{typedText}</p>
                    {!isTyping && <button className="dialog-btn" onClick={handleContinueDialog}>Continuar</button>}
                </div>
            )}

            {showQuestions && !finalDialog && (
                <div className="dialog-box">
                    <div className="dialog-text">{typedQuestion}</div>

                    {QUESTIONS[questionIndex].type === "text" && optionsVisible && (
                        <>
                            <input type="text" className="dialog-input" value={playerName} onChange={e => setPlayerName(e.target.value)} placeholder="Escribe tu nombre" />
                            <button className="dialog-btn" onClick={() => { if (playerName.trim() !== "") handleAnswer(playerName); }}>Continuar</button>
                        </>
                    )}

                    {QUESTIONS[questionIndex].type === "options" && optionsVisible && (
                        typedOptions.map((opt, idx) => (
                            <button key={idx} className="dialog-btn dialog-option" onClick={() => handleAnswer(QUESTIONS[questionIndex].options[idx])}>{opt}</button>
                        ))
                    )}
                </div>
            )}

            {finalDialog && (
                <div className="dialog-box">
                    <p className="dialog-text">{typedFinalDialog}</p>
                    {typedFinalDialog.length === "Perfecto, entonces firma este pergamino y serás oficialmente un nuevo alumno de nuestra prestigiosa academia".length && (
                        <button className="dialog-btn" onClick={handleSignScroll}>Firmar</button>
                    )}
                </div>
            )}

            {phase === "pergamino" && (
                <div className={`pergamino-container ${scrollVisible ? "visible" : ""}`} id="pergamino">
                    <img src={MagicScroll} alt="Pergamino mágico" className="pergamino-img" />
                    <div className={`pergamino-text ${scrollTextVisible ? "visible" : ""}`}>
                        {playerName}
                    </div>
                    <button className="dialog-btn download-btn" onClick={handleDownload}>
                        Descargar
                    </button>
                </div>
            )}
        </div>
    );
};

export default BeginningChapter;
