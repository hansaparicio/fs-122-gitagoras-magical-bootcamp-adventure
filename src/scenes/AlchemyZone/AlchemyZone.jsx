import { useEffect, useState } from "react";
import { useTime } from "../../context/TimeContext";
import { useGameOver } from "../../context/GameOverContext";
import { useInventory } from "../../context/InventoryContext";
import { GRIMORIOS } from "../../data/grimorios";
import "./AlchemyZone.css";
import AlchemyBackground from "../../assets/images/AlchemyBackground.png";
import CrossWordGame from "./CrossWordGame";
import GitagorasAvatar from "../../assets/images/GitagorasAvatar.png";
import ComponentScroll from "../../assets/images/ComponentScroll.png";
import CrosswordScroll from "../../assets/images/CrosswordScroll.png";

const INTRO_DIALOGS = [
    "Bienvenido, aprendiz, al Laboratorio de Alquimia del Código. Aquí no mezclamos hierbas ni metales, sino conceptos. La alquimia del marcado exige comprensión, no fuerza bruta.",

    "HTML es el lenguaje base de la web. No es programación, sino un lenguaje de marcado: su función no es decir qué hacer, sino describir qué es cada parte del contenido.",

    "Una página HTML está formada por ELEMENTOS. Un elemento suele componerse de una etiqueta de apertura, un contenido y una etiqueta de cierre. Por ejemplo: <h1>Título</h1> representa un encabezado.",

    "Las ETIQUETAS son las runas visibles del marcado. Indican al navegador si un fragmento es un párrafo, una imagen, una lista o un enlace. Cada etiqueta tiene un propósito concreto.",

    "Los ATRIBUTOS son modificadores alquímicos que se añaden a las etiquetas. Se escriben dentro de la etiqueta de apertura y aportan información adicional, como clases, identificadores o direcciones de archivo.",

    "Los COMENTARIOS son anotaciones invisibles para el navegador, pero esenciales para los alquimistas del código. Permiten explicar decisiones y recordar por qué se escribió un hechizo de cierta manera.",

    "Los elementos no existen de forma aislada: se organizan en una ESTRUCTURA jerárquica. Algunos contienen a otros, formando niveles de importancia y relación. Comprender esta estructura es clave para mantener el orden.",

    "Un COMPONENTE, en sentido conceptual, es un conjunto de elementos que trabajan juntos para cumplir una función. Pensar en componentes te ayuda a diseñar páginas claras, reutilizables y comprensibles.",

    "Una página bien construida es como una fórmula perfectamente equilibrada: cada etiqueta tiene un propósito, cada atributo una razón, y cada comentario una enseñanza para quien lea el código después.",

    "Para demostrar tu dominio del arte arcano del marcado, deberás resolver este crucigrama ancestral. No se trata de memorizar palabras, sino de comprender conceptos.",

    "Recuerda: en la alquimia del código, la precisión no es opcional. Una etiqueta mal cerrada o una estructura confusa puede romper todo el hechizo."
];


const END_DIALOGS = [
    "Impresionante. Has demostrado atención al detalle, precisión y una comprensión profunda de cómo cada elemento encaja en el todo.",
    "Como recompensa, te otorgo este Grimorio de Conocimiento Alquímico. No contiene fórmulas simples, sino caminos para perfeccionar tu dominio del HTML.",
    "Cuando te sientas preparado para avanzar, regresa a sus páginas. La verdadera alquimia del código se logra practicando, comprendiendo y refinando."
];


export default function AlchemyZone({ onExitZone }) {
    const { startTimer, stopTimer } = useTime();
    const { registerGameOverActions, hideGameOver } = useGameOver();
    const { addGrimoire } = useInventory();

    const [phase, setPhase] = useState("intro");
    const [dialogIndex, setDialogIndex] = useState(0);
    const [typedDialog, setTypedDialog] = useState("");
    const [gameKey, setGameKey] = useState(0);
    const [grimorioGranted, setGrimorioGranted] = useState(false);

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
            startTimer(480);

            registerGameOverActions({
                onRetry: () => {
                    hideGameOver();
                    setGameKey(k => k + 1);
                    startTimer(480);
                },
                onExit: () => {
                    hideGameOver();
                    onExitZone?.();
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

        if (!grimorioGranted) {
            addGrimoire(GRIMORIOS.alchemy);
            setGrimorioGranted(true);
        }

        setPhase("end");
        setDialogIndex(0);
    };

    return (
        <div
            className="alchemy-root"
            style={{ backgroundImage: `url(${AlchemyBackground})` }}
        >
            {phase === "intro" && dialogIndex >= 2 && dialogIndex < 9 && (
                <img src={ComponentScroll} className="library-scroll" />
            )}

            {phase === "intro" && dialogIndex >= 9 && (
                <img src={CrosswordScroll} className="library-scroll" />
            )}

            {(phase === "intro" || phase === "end") && (
                <div className="dialog-container">
                    <img src={GitagorasAvatar} className="dialog-avatar" />
                    <div className="dialog-box">
                        <p>{typedDialog}</p>
                        {typedDialog.length ===
                            (phase === "intro"
                                ? INTRO_DIALOGS[dialogIndex]
                                : END_DIALOGS[dialogIndex]).length && (
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
