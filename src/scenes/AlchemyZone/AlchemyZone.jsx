import { useEffect, useState } from "react";
import { useTime } from "../../context/TimeContext";
import { useGameOver } from "../../context/GameOverContext";
import "./AlchemyZone.css";
import AlchemyBackground from "../../assets/images/AlchemyBackground.png";
import CrossWordGame from "./CrossWordGame";
import GitagorasAvatar from "../../assets/images/GitagorasAvatar.png";
import ComponentScroll from "../../assets/images/ComponentScroll.png";
import CrosswordScroll from "../../assets/images/CrosswordScroll.png";

const INTRO_DIALOGS = [
    "Bienvenido, aprendiz, al Laboratorio de Alquimia del Código. Aquí no forjamos pociones con hierbas, sino con símbolos, etiquetas y estructuras que dan vida a las páginas del mundo digital.",

    "HTML es el antiguo lenguaje base de la web. No es programación, sino un lenguaje de marcado: su propósito es describir la estructura y el significado del contenido, no su comportamiento ni su magia visual.",

    "Cada página HTML está formada por ELEMENTOS. Un elemento es la unidad fundamental de este arte: suele componerse de una etiqueta de apertura, un contenido y una etiqueta de cierre. Por ejemplo, un elemento puede representar un título, un párrafo o una imagen dentro del pergamino digital.",

    "Como ya has aprendido, las ETIQUETAS son las runas que delimitan los elementos. Indican al navegador qué tipo de contenido está siendo invocado. Algunas etiquetas envuelven texto, otras invocan imágenes, enlaces o secciones completas del documento.",

    "Los ATRIBUTOS son modificadores alquímicos que se añaden a las etiquetas. Proporcionan información adicional sobre el elemento, como su identificador, su propósito o su relación con otros elementos. Un atributo siempre tiene un nombre y, normalmente, un valor.",

    "Los COMENTARIOS son anotaciones invisibles para el navegador, pero esenciales para los alquimistas del código. Sirven para explicar decisiones, documentar procesos y facilitar que otros —o tú mismo en el futuro— comprendan el hechizo escrito.",

    "Los elementos no existen de forma caótica: se organizan en una ESTRUCTURA. Algunos contienen a otros, formando una jerarquía similar a un árbol. Comprender esta estructura es clave para que el documento sea legible, accesible y mantenible.",

    "Un COMPONENTE, en el sentido conceptual, es un conjunto de elementos que trabajan juntos para cumplir una función concreta: una cabecera, un menú, una tarjeta de contenido. Aunque HTML puro no define componentes como tal, pensar de esta forma fortalece tu diseño.",

    "Una página bien construida es como una fórmula perfectamente equilibrada: cada elemento tiene un propósito, cada atributo una razón, y cada comentario una advertencia o enseñanza para el alquimista que la lea.",

    "Para demostrar tu dominio del arte arcano del marcado, deberás completar este crucigrama ancestral. Cada definición pondrá a prueba tu comprensión, no tu memoria.",

    "Recuerda: en la alquimia del código, la precisión no es opcional. Una etiqueta mal cerrada, un atributo mal definido o una estructura confusa pueden romper todo el hechizo."
];


const END_DIALOGS = [
    "Impresionante. Has demostrado atención al detalle y comprensión real.",
    "Dominar HTML no es memorizar etiquetas, sino entender su propósito.",
    "Sigue avanzando. La alquimia del código apenas comienza."
];

export default function AlchemyZone() {
    const { startTimer, stopTimer } = useTime();
    const { registerGameOverActions } = useGameOver();

    const [phase, setPhase] = useState("intro");
    const [dialogIndex, setDialogIndex] = useState(0);
    const [typedDialog, setTypedDialog] = useState("");
    const [gameKey, setGameKey] = useState(0);

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
            className="alchemy-root"
            style={{ backgroundImage: `url(${AlchemyBackground})` }}
        >

            {phase === "intro" && dialogIndex >= 2 && dialogIndex < 9 && (
                <img
                    src={ComponentScroll}
                    alt="Component Scroll"
                    className="library-scroll"
                />
            )}

            {phase === "intro" && dialogIndex >= 9 && dialogIndex < 12 && (
                <img
                    src={CrosswordScroll}
                    alt="Crossword Scroll"
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
                <CrossWordGame
                    key={gameKey}
                    onComplete={handleGameWin}
                />
            )}
        </div>
    );
}
