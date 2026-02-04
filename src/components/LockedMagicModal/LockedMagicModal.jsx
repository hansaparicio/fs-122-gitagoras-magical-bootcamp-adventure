import "./LockedMagicModal.css";

export default function LockedMagicModal({ visible, onClose }) {

    if (!visible) return null;

    return (
        <div className="locked-overlay">
            <div className="locked-modal">
                <h2>¡Sin prisas, joven mago!</h2>
                <p>
                    Aún no estás preparado para practicar esta magia.
                    <br />
                    Completa primero tus estudios anteriores.
                </p>
                <button onClick={onClose}>
                    Entendido
                </button>
            </div>
        </div>
    );
}
