import { useEffect, useState } from "react";
import { useTime } from "../../context/TimeContext";
import "./LibraryZone.css";
import LibraryBackground from "../../assets/images/LibraryBackground.png";
import CardGame from "./CardMatchingGame";

const INTRO_DIALOGS = [
    "Bienvenido a la biblioteca, joven aprendiz. Siéntete libre de venir y estudiar para mejorar tu magia y ampliar tus conocimientos.",
    "Aquí descansan antiguas escrituras sobre las etiquetas HTML. Son la estructura y arquitectura de la magia. De ellas depende que un hechizo se ejecute con precisión.",
    "Pero el saber está desordenado… necesito tu ayuda. ¿Podrías ordenar las etiquetas con su definición?",
    "Para ello, haz click sobre 2 cartas con distinto color. Las violetas contienen etiquetas y las doradas, definiciones. Combina ambas correctamente. ¡Pero date prisa o desaparecerán! Tienes 3 minutos."
];

const END_DIALOGS = [
    "¡Excelente trabajo joven aprendiz!. Ahora este conocimiento también forma parte de tí. Se que lograrás grandes cosas. Si no te importa, cuando puedas vuelve a mi despacho. Debo hablar algo contigo.",
    "Por cierto, me enorgullece otorgarte este Grimorio de conocimiento. Creo que te será útil. Y no, no hace falta que lo devuelvas a la biblioteca. Considéralo un regalo por tu gran hazaña."
];

export default function LibraryZone() {
    const { startTimer, stopTimer, timeLeft } = useTime();

    const [phase, setPhase] = useState("intro");
    const [dialogIndex, setDialogIndex] = useState(0);
    const [typedDialog, setTypedDialog] = useState("");
    const [charIndex, setCharIndex] = useState(0);
    const [gameKey, setGameKey] = useState(0);

    useEffect(() => {
        let interval;
        let text =
            phase === "intro"
                ? INTRO_DIALOGS[dialogIndex]
                : phase === "end"
                    ? END_DIALOGS[dialogIndex]
                    : "";

        if (text) {
            setTypedDialog("");
            setCharIndex(0);
            interval = setInterval(() => {
                setCharIndex(prev => {
                    const next = prev + 1;
                    setTypedDialog(text.slice(0, next));
                    if (next >= text.length) clearInterval(interval);
                    return next;
                });
            }, 30);
        }

        return () => clearInterval(interval);
    }, [phase, dialogIndex]);

    useEffect(() => {
        if (phase === "game") {
            startTimer(180);
        }

        if (phase === "end" || phase === "finished") {
            stopTimer();
        }
    }, [phase]);

    useEffect(() => {
        if (phase === "game" && timeLeft === 0) {
            alert("⏳ Se acabó el tiempo. Inténtalo de nuevo.");
            setGameKey(k => k + 1);
            startTimer(50);
        }
    }, [timeLeft]);

    const nextDialog = () => {
        const currentDialogs = phase === "intro" ? INTRO_DIALOGS : END_DIALOGS;

        if (dialogIndex < currentDialogs.length - 1) {
            setDialogIndex(d => d + 1);
        } else if (phase === "intro") {
            setPhase("game");
        } else {
            setPhase("finished");
        }
    };

    const handleGameWin = () => {
        stopTimer();
        setPhase("end");
        setDialogIndex(0);
    };

    return (
        <div
            className="library-root"
            style={{ backgroundImage: `url(${LibraryBackground})` }}
        >
            {phase === "intro" && (
                <div className="dialog-box">
                    <p>{typedDialog}</p>
                    {typedDialog.length === INTRO_DIALOGS[dialogIndex].length && (
                        <button onClick={nextDialog} className="dialog-btn">
                            Continuar
                        </button>
                    )}
                </div>
            )}

            {phase === "game" && (
                <div className="game-container">
                    <CardGame key={gameKey} onComplete={handleGameWin} />
                </div>
            )}

            {phase === "end" && (
                <div className="dialog-box">
                    <p>{typedDialog}</p>
                    {typedDialog.length === END_DIALOGS[dialogIndex].length && (
                        <button onClick={nextDialog} className="dialog-btn">
                            Continuar
                        </button>
                    )}
                </div>
            )}
        </div>
    );
}
