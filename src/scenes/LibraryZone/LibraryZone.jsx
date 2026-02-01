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
import GitagorasAvatar from "../../assets/images/GitagorasAvatar.png";

const INTRO_DIALOGS = [
    "Bienvenido a la Biblioteca Arcana, joven aprendiz. Este no es un lugar de prisas ni de conjuros ruidosos. Aquí se estudia la base de toda magia digital: la estructura. Sin estructura, no hay hechizo que se sostenga.",

    "Antes de animar, colorear o hacer reaccionar la magia, debes comprender su esqueleto. HTML es el lenguaje que define qué existe en una página: qué es un título, qué es un texto, qué es una imagen.",

    "HTML no decide cómo se ve la magia, sino qué es cada cosa. Un título sigue siendo un título aunque cambie su color. Un párrafo sigue siendo un párrafo aunque cambie su forma. HTML define el significado.",

    "Cada fragmento de HTML se invoca mediante símbolos llamados etiquetas. Las etiquetas se escriben usando signos angulares: < >. Por ejemplo, <p> invoca un párrafo y </p> lo cierra, delimitando su contenido.",

    "La mayoría de etiquetas se abren y se cierran. Abrir una etiqueta es como abrir un portal; cerrarla es sellarlo. Olvidar cerrar una etiqueta provoca caos: el hechizo se desborda y todo pierde sentido.",

    "Un documento HTML no es plano: tiene jerarquía. Algunas etiquetas contienen a otras, formando una estructura en forma de árbol. Esta jerarquía permite que el navegador entienda qué es más importante y qué depende de qué.",

    "Dentro del <body> vive todo aquello que el usuario puede ver y experimentar: textos, imágenes, botones y enlaces. Fuera de él existen reglas invisibles que organizan el documento, pero no se muestran.",

    "Algunas etiquetas aceptan atributos. Los atributos son modificadores que se escriben dentro de la etiqueta y aportan información extra, como rutas, identificadores o descripciones. Por ejemplo: <img src='imagen.png'>.",

    "Cuando comprendes qué representa cada etiqueta y cómo se relacionan entre sí, comienzas a pensar como un arquitecto del código, no como un simple escriba.",

    "Las runas del conocimiento han sido separadas de su significado. Únelas correctamente y demuestra que no solo memorizas símbolos, sino que comprendes su verdadero propósito."
];


const END_DIALOGS = [
    "Excelente trabajo, joven aprendiz. No te has limitado a repetir símbolos: has comprendido su propósito y su lugar en el hechizo.",
    "Como recompensa, te entrego este Grimorio Arcano. En sus páginas se recoge el conocimiento fundamental sobre la estructura del HTML, la base de toda creación digital.",
    "Guárdalo con cuidado. Un grimorio no responde solo a quien lo lee, sino a quien sabe cuándo volver a él. El camino del conocimiento apenas comienza."
];


export default function LibraryZone({ onExit }) {
    const { startTimer, stopTimer } = useTime();
    const { registerGameOverActions } = useGameOver();
    const { addGrimorio } = useInventory();

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
                onExit: () => { }
            });
        }

        if (phase === "end" || phase === "finished") {
            stopTimer();
        }
    }, [phase, onExit, registerGameOverActions, startTimer, stopTimer]);

    const nextDialog = () => {
        const dialogs = phase === "intro" ? INTRO_DIALOGS : END_DIALOGS;

        if (dialogIndex < dialogs.length - 1) {
            setDialogIndex(d => d + 1);
        } else if (phase === "intro") {
            setPhase("game");
        } else {
            setPhase("finished");
            onExit?.();
        }
    };

    const handleGameWin = () => {
        stopTimer();
        addGrimorio(GRIMORIOS.library);
        setPhase("end");
        setDialogIndex(0);
    };

    return (
        <div className="library-root" style={{ backgroundImage: `url(${LibraryBackground})` }}>
            {scrollImage && (
                <img src={scrollImage} alt="Pergamino explicativo" className="library-scroll" />
            )}

            {(phase === "intro" || phase === "end") && (
                <div className="dialog-container">
                    <img src={GitagorasAvatar} alt="Gitágoras" className="dialog-avatar" />
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
                <RuneMatchGame key={gameKey} onComplete={handleGameWin} />
            )}
        </div>
    );
}