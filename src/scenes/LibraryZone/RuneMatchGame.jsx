import { useEffect, useRef, useState } from "react";
import "./RuneMatchGame.css";
import RuneMatch from "../../assets/sounds/RuneMatch.mp3";

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
      .then(res => res.json())
      .then(data => {
        const fetchedPairs = data.pairs || [];
        setPairs(fetchedPairs);
        setShuffledDefs([...fetchedPairs].sort(() => Math.random() - 0.5));
        setLoading(false);
      })
      .catch(() => {
        const fallbackPairs = [
          { id: 1, term: "<h1>", definition: "Encabezado principal de mayor jerarquía" },
          { id: 2, term: "<p>", definition: "Elemento para definir párrafos de texto" },
          { id: 3, term: "<img>", definition: "Etiqueta para mostrar imágenes en la página" },
          { id: 4, term: "<a>", definition: "Crea enlaces a otras páginas o recursos" },
          { id: 5, term: "<body>", definition: "Contiene el contenido visible del documento" },
          { id: 6, term: "<br>", definition: "Inserta un salto de línea forzado" },
          { id: 7, term: "<strong>", definition: "Resalta texto con énfasis semántico fuerte" },
          { id: 8, term: "<input>", definition: "Campo para introducir datos del usuario" },
          { id: 9, term: "<div>", definition: "Contenedor genérico para agrupar elementos" },
          { id: 10, term: "<span>", definition: "Contenedor en línea para texto o estilos" }
        ];

        setPairs(fallbackPairs);
        setShuffledDefs([...fallbackPairs].sort(() => Math.random() - 0.5));
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
