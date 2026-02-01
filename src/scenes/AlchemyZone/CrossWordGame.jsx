import { useEffect, useRef, useState } from "react";
import "./CrossWordGame.css";
import solvedWordSound from "../../assets/sounds/SolvedWordSound.mp3";
import pressKeySound from "../../assets/sounds/PressKeyGameSound.mp3";
import bubblePopSound from "../../assets/sounds/BubblePopWord.mp3";

const SIZE = 19;

const WORDS = [
    { word: "HTML", row: 2, col: 4, dir: "h", clue: "Lenguaje base de la web." },
    { word: "ETIQUETA", row: 5, col: 10, dir: "h", clue: "Elemento definido con <>." },
    { word: "IMAGEN", row: 6, col: 5, dir: "h", clue: "Elemento visual (no lleva cierre)." },
    { word: "COMENTARIO", row: 8, col: 4, dir: "h", clue: "Texto ignorado por el navegador." },
    { word: "CLASE", row: 10, col: 6, dir: "h", clue: "Identificador CSS." },
    { word: "BODY", row: 10, col: 15, dir: "h", clue: "Cuerpo del documento HTML." },
    { word: "FORMULARIO", row: 12, col: 6, dir: "h", clue: "Entrada de datos del usuario." },
    { word: "PARRAFO", row: 17, col: 2, dir: "h", clue: "Etiqueta <p>." },
    { word: "BOTON", row: 17, col: 15, dir: "h", clue: "Elemento interactivo." },

    { word: "LISTA", row: 2, col: 7, dir: "v", clue: "Elemento de listas." },
    { word: "ATRIBUTO", row: 10, col: 8, dir: "v", clue: "Propiedad de una etiqueta." },
    { word: "ENLACE", row: 5, col: 10, dir: "v", clue: "Permite navegar." },
    { word: "CONTENEDOR", row: 8, col: 4, dir: "v", clue: "Elemento <div>." },
    { word: "TITULO", row: 5, col: 16, dir: "v", clue: "Texto de la pestaña." },
    { word: "DOCUMENTO", row: 10, col: 17, dir: "v", clue: "Archivo HTML." },
    { word: "ELEMENTO", row: 11, col: 11, dir: "v", clue: "Unidad básica de HTML." },
    { word: "RUTA", row: 2, col: 17, dir: "v", clue: "Dirección de un archivo." }
];

export default function CrossWordGame({ onComplete }) {
    const [grid, setGrid] = useState(
        Array.from({ length: SIZE }, () => Array(SIZE).fill(""))
    );
    const [helpUses, setHelpUses] = useState(5);
    const [completedWords, setCompletedWords] = useState(new Set());
    const [activeWord, setActiveWord] = useState(null);

    const inputRefs = useRef({});
    const solvedAudio = useRef(null);
    const keyAudio = useRef(null);
    const bubbleAudio = useRef(null);
    const playedWords = useRef(new Set());

    useEffect(() => {
        solvedAudio.current = new Audio(solvedWordSound);
        keyAudio.current = new Audio(pressKeySound);
        bubbleAudio.current = new Audio(bubblePopSound);
    }, []);

    const validCells = new Set();

    WORDS.forEach(({ word, row, col, dir }) => {
        [...word].forEach((_, i) => {
            const r = (dir === "h" ? row : row + i) - 1;
            const c = (dir === "h" ? col + i : col) - 1;
            validCells.add(`${r}-${c}`);
        });
    });

    const cellBelongsToWord = (r, c, w) =>
        [...w.word].some((_, i) => {
            const rr = (w.dir === "h" ? w.row : w.row + i) - 1;
            const cc = (w.dir === "h" ? w.col + i : w.col) - 1;
            return rr === r && cc === c;
        });

    const getWordsAtCell = (r, c) =>
        WORDS.filter(w => cellBelongsToWord(r, c, w));


    const moveInActiveWord = (r, c, backwards = false) => {
        if (!activeWord) return;

        const { word, row, col, dir } = activeWord;

        const index = [...word].findIndex((_, i) => {
            const rr = (dir === "h" ? row : row + i) - 1;
            const cc = (dir === "h" ? col + i : col) - 1;
            return rr === r && cc === c;
        });

        if (index === -1) return;

        const step = backwards ? -1 : 1;

        for (let i = index + step; i >= 0 && i < word.length; i += step) {
            const nr = (dir === "h" ? row : row + i) - 1;
            const nc = (dir === "h" ? col + i : col) - 1;

            if (backwards || !grid[nr][nc]) {
                inputRefs.current[`${nr}-${nc}`]?.focus();
                return;
            }
        }
    };


    const handleChange = (r, c, value) => {
        if (!/^[A-ZÑ]?$/.test(value.toUpperCase())) return;

        if (value) {
            keyAudio.current.currentTime = 0;
            keyAudio.current.play();
        }

        setGrid(g => {
            const copy = g.map(row => [...row]);
            copy[r][c] = value.toUpperCase();
            return copy;
        });

        if (!value) return;

        if (!activeWord) {
            const candidates = getWordsAtCell(r, c);
            if (candidates.length) setActiveWord(candidates[0]);
        }

        moveInActiveWord(r, c);
    };

    const handleKeyDown = (e, r, c) => {
        if (e.key !== "Backspace") return;

        e.preventDefault();

        bubbleAudio.current.currentTime = 0;
        bubbleAudio.current.play();

        if (grid[r][c]) {
            setGrid(g => {
                const copy = g.map(row => [...row]);
                copy[r][c] = "";
                return copy;
            });
        } else {
            moveInActiveWord(r, c, true);

            setTimeout(() => {
                const refKey = Object.keys(inputRefs.current)
                    .find(k => inputRefs.current[k] === document.activeElement);
                if (!refKey) return;

                const [pr, pc] = refKey.split("-").map(Number);

                setGrid(g => {
                    const copy = g.map(row => [...row]);
                    copy[pr][pc] = "";
                    return copy;
                });
            }, 0);
        }
    };

    const revealRandomLetter = () => {
        if (helpUses <= 0) return;

        const pending = [];

        WORDS.forEach(w =>
            [...w.word].forEach((l, i) => {
                const r = (w.dir === "h" ? w.row : w.row + i) - 1;
                const c = (w.dir === "h" ? w.col + i : w.col) - 1;
                if (grid[r][c] !== l) pending.push({ r, c, l });
            })
        );

        if (!pending.length) return;

        const chosen = pending[Math.floor(Math.random() * pending.length)];

        setGrid(g => {
            const copy = g.map(row => [...row]);
            copy[chosen.r][chosen.c] = chosen.l;
            return copy;
        });

        setHelpUses(u => u - 1);
    };

    useEffect(() => {
        const completed = new Set();

        WORDS.forEach((w, index) => {
            const ok = [...w.word].every((l, i) => {
                const r = (w.dir === "h" ? w.row : w.row + i) - 1;
                const c = (w.dir === "h" ? w.col + i : w.col) - 1;
                return grid[r][c] === l;
            });

            if (ok) {
                completed.add(index);
                if (!playedWords.current.has(index)) {
                    solvedAudio.current.play();
                    playedWords.current.add(index);
                }
            }
        });

        setCompletedWords(completed);
        if (completed.size === WORDS.length) onComplete?.();
    }, [grid]);

    return (
        <div className="crossword-wrapper">
            <div className="clues">
                <h3>HORIZONTALES</h3>
                {WORDS.filter(w => w.dir === "h").map((w, i) => {
                    const index = WORDS.indexOf(w);
                    return (
                        <p key={i} className={`clue-line ${completedWords.has(index) ? "completed" : ""}`}>
                            {w.clue}
                        </p>
                    );
                })}

                <h3>VERTICALES</h3>
                {WORDS.filter(w => w.dir === "v").map((w, i) => {
                    const index = WORDS.indexOf(w);
                    return (
                        <p key={i} className={`clue-line ${completedWords.has(index) ? "completed" : ""}`}>
                            {w.clue}
                        </p>
                    );
                })}
            </div>

            <div className="crossword-grid" style={{ "--size": SIZE }}>
                {grid.map((row, r) =>
                    row.map((cell, c) => (
                        <input
                            key={`${r}-${c}`}
                            ref={el => (inputRefs.current[`${r}-${c}`] = el)}
                            className={`cell ${validCells.has(`${r}-${c}`) ? "" : "blocked"}`}
                            disabled={!validCells.has(`${r}-${c}`)}
                            value={cell}
                            maxLength={1}
                            onChange={e => handleChange(r, c, e.target.value)}
                            onKeyDown={e => handleKeyDown(e, r, c)}
                            onFocus={() => {
                                if (!activeWord || !cellBelongsToWord(r, c, activeWord)) {
                                    const candidates = getWordsAtCell(r, c);
                                    if (candidates.length) setActiveWord(candidates[0]);
                                }
                            }}
                        />
                    ))
                )}
            </div>

            <div className="crossword-actions">
                <button
                    className="crossword-btn help"
                    onClick={revealRandomLetter}
                    disabled={helpUses === 0}
                >
                    {helpUses > 0 ? `PISTA (${helpUses} intentos restantes)` : "¡AYUDA AGOTADA!"}
                </button>
            </div>
        </div>
    );
}