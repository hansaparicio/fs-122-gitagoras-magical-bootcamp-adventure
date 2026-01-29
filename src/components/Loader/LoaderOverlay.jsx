import { useEffect, useState } from "react";
import LoaderGif from "../../assets/images/Loader.gif";
import "./LoaderOverlay.css";

export default function LoaderOverlay({ visible }) {
  const [show, setShow] = useState(visible);

  useEffect(() => {
    if (visible) {
      setShow(true);
    } else {
      const timer = setTimeout(() => setShow(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [visible]);

  if (!show) return null;

  return (
    <div className={`loader-overlay ${!visible ? "fade-out" : ""}`}>
      <img src={LoaderGif} alt="Cargando..." className="loader-gif" />
      <span className="loader-text">Canalizando magia...</span>
    </div>
  );
}
