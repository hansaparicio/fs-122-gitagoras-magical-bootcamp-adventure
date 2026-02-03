import { useEffect, useState } from "react";
import { useTime } from "../../context/TimeContext";
import { useGameOver } from "../../context/GameOverContext";
import { useInventory } from "../../context/InventoryContext";
import { GRIMORIOS } from "../../data/grimorios";
import "./LibraryZone.css";
import LibraryBackground from "../../assets/images/LibraryBackground.png";
import RuneMatchGame from "./RuneMatchGame";
import HtmlScroll from "../../assets/images/HtmlScroll.png";
import TagScroll from "../../assets/images/TagScroll.png";
import BodyScroll from "../../assets/images/BodyScroll.png";
import ManyTagsScroll from "../../assets/images/ManyTagsScroll.png";
import GitagorasAvatar from "../../assets/images/GitagorasAvatar.png";

const INTRO_DIALOGS = [
    "Bienvenido a la Biblioteca Arcana, joven aprendiz. Este no es un lugar de prisas ni de conjuros ruidosos. Aquí se estudia la base de toda magia digital: la estructura. Sin estructura, incluso el hechizo más poderoso se derrumba.",
    "Antes de animar, colorear o hacer reaccionar la magia, debes comprender su esqueleto. HTML es el lenguaje que define qué existe en una página: qué es un título, qué es un texto, qué es una imagen. No habla de apariencia, sino de significado.",
    "HTML no decide cómo se ve la magia, sino qué es cada cosa. Un título sigue siendo un título aunque cambie su color. Un párrafo sigue siendo un párrafo aunque cambie su tamaño. HTML da sentido al contenido antes de embellecerlo.",
    "Cada fragmento de HTML se invoca mediante símbolos llamados etiquetas. Estas runas se escriben usando signos angulares: < >. Una etiqueta abre un concepto, y su cierre lo delimita, definiendo dónde empieza y dónde termina su influencia.",
    "La mayoría de etiquetas funcionan como portales: se abren y se cierran. Abrir una etiqueta es permitir que algo exista; cerrarla es contenerlo. Olvidar cerrar una etiqueta provoca caos: el hechizo se desborda y la estructura pierde coherencia.",
    "Un documento HTML no es plano ni caótico. Posee jerarquía. Algunas etiquetas contienen a otras, formando una estructura en forma de árbol. Esta jerarquía permite al navegador —y al aprendiz— comprender qué es más importante y qué depende de qué.",
    "Dentro del <body> vive todo aquello que el usuario puede ver y experimentar: textos, imágenes, botones y enlaces. Es el escenario visible del hechizo. Fuera de él existen reglas invisibles, necesarias, pero no mostradas.",
    "Algunas etiquetas aceptan atributos. Los atributos son modificadores: pequeñas inscripciones que añaden información extra. Gracias a ellos, una imagen sabe dónde encontrar su forma, o un elemento puede ser identificado entre muchos otros.",
    "Cuando comienzas a comprender qué representa cada etiqueta y cómo se relaciona con las demás, dejas de escribir símbolos al azar. Empiezas a pensar como un arquitecto del código, no como un simple copista.",
    "Sin embargo, el conocimiento verdadero no se demuestra repitiendo definiciones, sino reconociendo el propósito oculto tras cada símbolo.",
    "Las runas del conocimiento han sido separadas de su significado. Algunas muestran su forma, otras guardan su intención. Solo quien logra unir ambos aspectos demuestra haber entendido la estructura del hechizo.",
    "No te preocupes si no conoces todas, intenta utilizar lo que has leído y tu propio sentido común. Verás que es más sencillo de lo que parece"
];

const END_DIALOGS = [
    "Excelente trabajo, joven aprendiz.",
    "Un nuevo conocimiento ha sido añadido a tu inventario.",
    "El camino del conocimiento apenas comienza."
];

export default function LibraryZone({ onExit }) {
    const { startTimer, stopTimer } = useTime();
    const { registerGameOverActions, hideGameOver } = useGameOver();
    const { addGrimoire } = useInventory();

    const [phase, setPhase] = useState("intro");
    const [dialogIndex, setDialogIndex] = useState(0);
    const [typedDialog, setTypedDialog] = useState("");
    const [grimorioGranted, setGrimorioGranted] = useState(false);

    const exitZoneSafely = () => {
        stopTimer();
        hideGameOver();
        onExit?.();
    };

    useEffect(() => {
        return () => {
            stopTimer();
            hideGameOver();
        };
    }, []);

    const getScrollImage = () => {
        if (phase !== "intro") return null;
        if (dialogIndex === 1 || dialogIndex === 2) return HtmlScroll;
        if (dialogIndex === 3) return ManyTagsScroll;
        if (dialogIndex === 4) return TagScroll;
        if (dialogIndex === 6) return BodyScroll;
        return null;
    };

    useEffect(() => {
        const dialogs = phase === "intro" ? INTRO_DIALOGS : END_DIALOGS;
        const text = dialogs[dialogIndex];
        if (!text) return;

        setTypedDialog("");
        let i = 0;

        const interval = setInterval(() => {
            i++;
            setTypedDialog(text.slice(0, i));
            if (i >= text.length) clearInterval(interval);
        }, 32);

        return () => clearInterval(interval);
    }, [phase, dialogIndex]);

    useEffect(() => {
        if (phase === "game") {
            startTimer(180);
            registerGameOverActions({
                onRetry: () => startTimer(180),
                onExit: exitZoneSafely
            });
        } else {
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
            exitZoneSafely();
        }
    };

    const skipIntro = () => setPhase("game");

    const handleGameWin = () => {
        stopTimer();

        if (!grimorioGranted) {
            addGrimoire(GRIMORIOS.library);
            setGrimorioGranted(true);
        }

        setPhase("end");
        setDialogIndex(0);
    };

    return (
        <div className="library-root" style={{ backgroundImage: `url(${LibraryBackground})` }}>
            <div className="library-stage">
                {getScrollImage() && (
                    <img src={getScrollImage()} className="library-scroll" />
                )}

                {(phase === "intro" || phase === "end") && (
                    <div className="library-dialog-wrapper">
                        <img src={GitagorasAvatar} className="library-dialog-avatar" />

                        <div className="library-dialog-box">
                            <p>{typedDialog}</p>

                            <div className="library-dialog-actions">
                                {typedDialog.length ===
                                    (phase === "intro"
                                        ? INTRO_DIALOGS[dialogIndex]
                                        : END_DIALOGS[dialogIndex]).length && (
                                        <>
                                            {phase === "intro" && (
                                                <button
                                                    className="library-dialog-btn library-dialog-skip"
                                                    onClick={skipIntro}
                                                >
                                                    IGNORAR <br /> (salta al minijuego)
                                                </button>
                                            )}

                                            <button
                                                className="library-dialog-btn"
                                                onClick={nextDialog}
                                            >
                                                Continuar
                                            </button>
                                        </>
                                    )}
                            </div>
                        </div>
                    </div>
                )}

                {phase === "game" && (
                    <div className="rune-game-container">
                        <RuneMatchGame onComplete={handleGameWin} />
                    </div>
                )}

            </div>
        </div>
    );
}
