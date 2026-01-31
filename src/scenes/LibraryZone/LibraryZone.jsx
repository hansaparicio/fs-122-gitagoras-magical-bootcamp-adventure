import { useEffect, useState } from "react";
import { useTime } from "../../context/TimeContext";
import { useGameOver } from "../../context/GameOverContext";
import "./LibraryZone.css";
import LibraryBackground from "../../assets/images/LibraryBackground.png";
import RuneMatchGame from "./RuneMatchGame";
import HtmlScroll from "../../assets/images/HtmlScroll.png";
import TagScroll from "../../assets/images/TagScroll.png";
import BodyScroll from "../../assets/images/BodyScroll.png";
import GitagorasAvatar from "../../assets/images/GitagorasAvatar.png";

const INTRO_DIALOGS = [
    "Bienvenido a la Biblioteca Arcana, joven aprendiz. Aquí no hallarás hechizos explosivos ni conjuros veloces. Este es un lugar de estudio, paciencia y comprensión profunda.",
    "Antes de dominar la magia del movimiento o del color, debes entender su esqueleto. HTML es el lenguaje que define la estructura de todo hechizo digital.",
    "HTML no decide cómo se ve la magia, sino qué existe. Define títulos, párrafos, imágenes y enlaces. Sin HTML, la web sería un vacío sin forma.",
    "Cada elemento HTML se invoca mediante símbolos llamados etiquetas. Estas etiquetas indican al mundo qué representa cada fragmento del hechizo.",
    "Las etiquetas suelen abrirse y cerrarse. Al abrir una etiqueta, invocas su poder. Al cerrarla, delimitas su alcance. Olvidar cerrarla es como dejar un portal inestable.",
    "Un documento HTML completo posee jerarquía. Algunas etiquetas gobiernan a otras, formando una estructura clara y ordenada.",
    "Dentro del cuerpo del documento —el <body>— vive todo aquello que el usuario puede ver y experimentar. Lo demás permanece oculto.",
    "Algunas etiquetas aceptan atributos. Son encantamientos adicionales que modifican su comportamiento: rutas, descripciones, referencias.",
    "Ahora que comprendes los fundamentos, es momento de demostrar que sabes reconocer cada símbolo y su verdadero propósito.",
    "Las runas han sido separadas de su significado. Únelas correctamente y restablece el orden del conocimiento."
];

const END_DIALOGS = [
    "Excelente trabajo, joven aprendiz. Has demostrado comprensión, no solo memoria. Eso es lo que diferencia a un verdadero mago del código.",
    "Como recompensa, te otorgo estos Grimorios de conocimiento. Consérvalo. Podrás consultarlo siempre que necesites repasar los fundamentos.",
    "Recuerda: toda gran magia se construye sobre una base sólida. HTML es el inicio de tu viaje."
];

export default function LibraryZone() {
    const { startTimer, stopTimer } = useTime();
    const { registerGameOverActions } = useGameOver();

    const [phase, setPhase] = useState("intro");
    const [dialogIndex, setDialogIndex] = useState(0);
    const [typedDialog, setTypedDialog] = useState("");
    const [gameKey, setGameKey] = useState(0);

    const getScrollImage = () => {
        if (phase !== "intro") return null;
        if (dialogIndex === 1 || dialogIndex === 2) return HtmlScroll;
        if (dialogIndex === 4) return TagScroll;
        if (dialogIndex === 6) return BodyScroll;
        return null;
    };

    const scrollImage = getScrollImage();

    useEffect(() => {
        let interval;
        const dialogs = phase === "intro" ? INTRO_DIALOGS : END_DIALOGS;
        const text = dialogs[dialogIndex];

        if (text) {
            setTypedDialog("");
            let i = 0;
            interval = setInterval(() => {
                i++;
                setTypedDialog(text.slice(0, i));
                if (i >= text.length) clearInterval(interval);
            }, 25);
        }

        return () => clearInterval(interval);
    }, [phase, dialogIndex]);

    useEffect(() => {
        if (phase === "game") {
            startTimer(60);
            registerGameOverActions({
                onRetry: () => {
                    setGameKey(k => k + 1);
                    startTimer(60);
                },
                onExit: () => {
                    console.log("Volver al mapa (pendiente)");
                }
            });
        }

        if (phase === "end" || phase === "finished") {
            stopTimer();
        }
    }, [phase]);

    const nextDialog = () => {
        const dialogs = phase === "intro" ? INTRO_DIALOGS : END_DIALOGS;

        if (dialogIndex < dialogs.length - 1) {
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
            {scrollImage && (
                <img
                    src={scrollImage}
                    alt="Pergamino explicativo"
                    className="library-scroll"
                />
            )}

            {(phase === "intro" || phase === "end") && (
                <div className="dialog-container">
                    <img
                        src={GitagorasAvatar}
                        alt="Gitágoras"
                        className="dialog-avatar"
                    />

                    <div className="dialog-box">
                        <p>{typedDialog}</p>
                        {typedDialog.length ===
                            (phase === "intro"
                                ? INTRO_DIALOGS[dialogIndex]
                                : END_DIALOGS[dialogIndex]
                            ).length && (
                                <button className="dialog-btn" onClick={nextDialog}>
                                    Continuar
                                </button>
                            )}
                    </div>
                </div>
            )}

            {phase === "game" && (
                <RuneMatchGame
                    key={gameKey}
                    onComplete={handleGameWin}
                />
            )}
        </div>
    );
}
