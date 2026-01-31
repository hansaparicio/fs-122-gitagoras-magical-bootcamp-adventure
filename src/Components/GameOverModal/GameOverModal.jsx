import { useGameOver } from "../../context/GameOverContext";
import "./GameOverModal.css";

export default function GameOverModal() {
    const { visible, onRetry, onExit, hideGameOver } = useGameOver();

    if (!visible) return null;

    return (
        <div className="gameover-overlay">
            <div className="dialog-box">
                <p>¡Ups! Se acabó el tiempo, joven aprendiz…</p>

                <div className="gameover-buttons">
                    <button
                        className="dialog-btn"
                        onClick={() => {
                            hideGameOver();
                            onRetry?.();
                        }}
                    >
                        Reintentar
                    </button>

                    <button
                        className="dialog-btn"
                        onClick={() => {
                            hideGameOver();
                            onExit?.();
                        }}
                    >
                        Salir de la zona
                    </button>
                </div>
            </div>
        </div>
    );
}
