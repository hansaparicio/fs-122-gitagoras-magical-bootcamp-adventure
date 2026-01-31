import { useEffect, useState } from "react";
import "./RuneMatchGame.css";

export default function RuneMatchGame({ onComplete }) {
  const [pairs, setPairs] = useState([]);
  const [shuffledDefs, setShuffledDefs] = useState([]);
  const [selectedTerm, setSelectedTerm] = useState(null);
  const [matched, setMatched] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("RuneMatchGame mounted");
    fetch("http://localhost:5000/api/html-runes-hf")
      .then(res => res.json())
      .then(data => {
        const pairs = data.pairs || []
        setPairs(pairs);
        setShuffledDefs([...pairs].sort(() => Math.random() - 0.5));
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const handleTermClick = (pair) => {
    if (matched.includes(pair.id)) return;
    setSelectedTerm(pair);
  };

  const handleDefClick = (pair) => {
    if (!selectedTerm) return;

    if (pair.id === selectedTerm.id) {
      setMatched(prev => [...prev, pair.id]);

      if (matched.length + 1 === pairs.length) {
        onComplete?.();
      }
    }

    setSelectedTerm(null);
  };

  if (loading) {
    return <div className="rune-game">Cargando runas mágicas...</div>;
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
