import OpenedGrimoire from "../../assets/images/Grimoires/OpenedGrimoire.png";
import "./GrimorioModal.css";

export default function GrimorioModal({ grimoire, onClose }) {
    return (
        <div className="grimorio-overlay" onClick={onClose}>
            <div className="grimorio-modal" onClick={e => e.stopPropagation()}>
                <img
                    src={OpenedGrimoire}
                    alt="Grimorio abierto"
                    className="grimorio-book"
                />

                <div className="grimorio-content">
                    <p className="grimorio-text">{grimoire.text}</p>

                    <a
                        href={grimoire.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="grimorio-link"
                    >
                        Abrir conocimiento
                    </a>

                    <button className="grimorio-close" onClick={onClose}>
                        Cerrar
                    </button>
                </div>
            </div>
        </div>
    );
}
