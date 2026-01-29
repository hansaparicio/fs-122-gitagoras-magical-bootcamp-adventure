import { useEffect, useState, useRef } from "react";
import TagCard from "../../assets/images/TagCard.png";
import TagBack from "../../assets/images/TagCardBack.png";
import DefCard from "../../assets/images/DefCard.png";
import DefBack from "../../assets/images/DefCardBack.png";
import flipSound from "../../assets/sounds/CardSwap.mp3";
import "./LibraryZone.css";

const PAIRS = [
  { id: 1, tag: "<h1>", def: "Título principal" },
  { id: 2, tag: "<p>", def: "Párrafo de texto" },
  { id: 3, tag: "<a>", def: "Enlace" },
  { id: 4, tag: "<img>", def: "Imagen" },
  { id: 5, tag: "<ul>", def: "Lista desordenada" },
  { id: 6, tag: "<li>", def: "Elemento de una lista" },
  { id: 7, tag: "<div>", def: "Contenedor genérico" },
  { id: 8, tag: "<span>", def: "Texto en línea" },
  { id: 9, tag: "<button>", def: "Botón interactivo" },
  { id: 10, tag: "<body>", def: "Cuerpo del documento" }
];

export default function CardGame({ onComplete }) {
  const [cards, setCards] = useState([]);
  const [tagSel, setTagSel] = useState(null);
  const [defSel, setDefSel] = useState(null);
  const [result, setResult] = useState(null);
  const [animating, setAnimating] = useState(false);

  const audioRef = useRef(null);

  useEffect(() => {
    audioRef.current = new Audio(flipSound);

    const tagCards = PAIRS.map(p => ({
      id: p.id,
      type: "tag",
      text: p.tag,
      flipped: false
    }));

    const defCards = PAIRS.map(p => ({
      id: p.id,
      type: "def",
      text: p.def,
      flipped: false
    }));

    setCards(shuffle([...tagCards, ...defCards]));
  }, []);

  useEffect(() => {
    if (tagSel && defSel) {
      if (tagSel.id === defSel.id) {
        setResult("correct");
      } else {
        setResult("wrong");
      }
    }
  }, [tagSel, defSel]);

  const handleClick = card => {
    if (animating || card.flipped || result) return;

    audioRef.current.currentTime = 0;
    audioRef.current.play();

    if (card.type === "tag" && tagSel) {
      setResult("error");
      return;
    }

    if (card.type === "def" && defSel) {
      setResult("error");
      return;
    }

    setCards(cs =>
      cs.map(c =>
        c.id === card.id && c.type === card.type
          ? { ...c, flipped: true }
          : c
      )
    );

    card.type === "tag" ? setTagSel(card) : setDefSel(card);
  };

  const resetWrong = () => {
    setAnimating(true);

    setTimeout(() => {
      setCards(cs =>
        cs.map(c => {
          if (
            (c.id === tagSel.id && c.type === tagSel.type) ||
            (c.id === defSel.id && c.type === defSel.type)
          ) {
            return { ...c, flipped: false };
          }
          return c;
        })
      );

      clearSelection();
      setAnimating(false);
    }, 600);
  };

  const confirmCorrect = () => {
    setAnimating(true);

    setTimeout(() => {
      setCards(cs => cs.filter(c => c.id !== tagSel.id));
      clearSelection();
      setAnimating(false);

      if (cards.length <= 2) {
        onComplete();
      }
    }, 600);
  };

  const clearSelection = () => {
    setTagSel(null);
    setDefSel(null);
    setResult(null);
  };

  return (
    <div className="card-game">
      <div className="card-grid">
        {cards.map((card, i) => (
          <div
            key={`${card.type}-${card.id}-${i}`}
            className={`card ${card.flipped ? "flipped" : ""}`}
            onClick={() => handleClick(card)}
          >
            <div className="card-inner">
              <div className="card-front">
                <img
                  src={card.type === "tag" ? TagBack : DefBack}
                  alt=""
                />
              </div>
              <div className="card-back">
                <img
                  src={card.type === "tag" ? TagCard : DefCard}
                  alt=""
                />
                <span className="card-text">{card.text}</span>
              </div>

              {card.flipped && <div className="sparkles"></div>}
            </div>
          </div>
        ))}
      </div>

      {result === "error" && (
        <div className="dialog-box">
          <p>¡No puedes escoger dos cartas del mismo tipo!</p>
          <button className="dialog-btn" onClick={() => setResult(null)}>
            Aceptar
          </button>
        </div>
      )}

      {result === "wrong" && (
        <div className="dialog-box">
          <p>No es la combinación correcta.</p>
          <button className="dialog-btn" onClick={resetWrong}>
            Prueba otra vez
          </button>
        </div>
      )}

      {result === "correct" && (
        <div className="dialog-box">
          <p>¡Correcto!</p>
          <button className="dialog-btn" onClick={confirmCorrect}>
            Continuar
          </button>
        </div>
      )}
    </div>
  );
}

function shuffle(arr) {
  return [...arr].sort(() => Math.random() - 0.5);
}
