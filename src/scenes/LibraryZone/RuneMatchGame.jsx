import { useEffect, useRef, useState } from "react";
import "./RuneMatchGame.css";
import RuneMatch from "../../assets/sounds/RuneMatch.mp3";

const FALLBACK_PAIRS = [
  { id: 1, term: "<html>", definition: "Define el documento HTML completo" },
  { id: 2, term: "<head>", definition: "Contiene metadatos del documento" },
  { id: 3, term: "<body>", definition: "Define el cuerpo visible del documento" },
  { id: 4, term: "<h1>", definition: "Define un encabezado de nivel 1" },
  { id: 5, term: "<p>", definition: "Define un párrafo de texto" },
  { id: 6, term: "<a>", definition: "Define un hipervínculo" },
  { id: 7, term: "<img>", definition: "Inserta una imagen" },
  { id: 8, term: "<div>", definition: "Define un contenedor genérico" }
];

export default function RuneMatchGame({ onComplete }) {
  const [pairs, setPairs] = useState([]);
  const [shuffledDefs, setShuffledDefs] = useState([]);
  const [selectedTerm, setSelectedTerm] = useState(null);
  const [matched, setMatched] = useState([]);
  const [loading, setLoading] = useState(true);

  const matchAudio = useRef(null);
  const completedRef = useRef(false);

  useEffect(() => {
    matchAudio.current = new Audio(RuneMatch);

    fetch("http://localhost:5000/api/html-runes-hf")
      .then(res => {
        if (!res.ok) throw new Error('Backend not available');
        return res.json();
      })
      .then(data => {
        const pairs = data.pairs || [];
        setPairs(pairs);
        setShuffledDefs([...pairs].sort(() => Math.random() - 0.5));
        setLoading(false);
      })
      .catch(err => {
        console.warn("Backend no disponible, usando datos de respaldo:", err);
        // Usar datos de respaldo si el backend no está disponible
        setPairs(FALLBACK_PAIRS);
        setShuffledDefs([...FALLBACK_PAIRS].sort(() => Math.random() - 0.5));
        setLoading(false);
      });
  }, []);


  useEffect(() => {
    if (
      pairs.length > 0 &&
      matched.length === pairs.length &&
      !completedRef.current
    ) {
      completedRef.current = true;
      onComplete?.();
    }
  }, [matched, pairs, onComplete]);

  const handleTermClick = pair => {
    if (matched.includes(pair.id)) return;
    setSelectedTerm(pair);
  };

  const handleDefClick = pair => {
    if (!selectedTerm) return;

    if (pair.id === selectedTerm.id) {
      matchAudio.current.currentTime = 0;
      matchAudio.current.play();

      setMatched(prev =>
        prev.includes(pair.id) ? prev : [...prev, pair.id]
      );
    }

    setSelectedTerm(null);
  };

  if (loading) {
    return <div className="rune-gameLoader">Cargando runas mágicas...</div>;
  }

  return (
    <div className="rune-game">
      <div className="rune-column">
        <h3 className="column-title">Runas</h3>
        {pairs.map(pair => (
          <div
            key={pair.id}
            className={`rune term
              ${selectedTerm?.id === pair.id ? "selected" : ""}
              ${matched.includes(pair.id) ? "matched" : ""}`}
            onClick={() => handleTermClick(pair)}
          >
            {pair.term}
          </div>
        ))}
      </div>

      <div className="rune-column">
        <h3 className="column-title">Significado</h3>
        {shuffledDefs.map(pair => (
          <div
            key={pair.id}
            className={`rune def ${matched.includes(pair.id) ? "matched" : ""}`}
            onClick={() => handleDefClick(pair)}
          >
            {pair.definition}
          </div>
        ))}
      </div>
    </div>
  );
}
