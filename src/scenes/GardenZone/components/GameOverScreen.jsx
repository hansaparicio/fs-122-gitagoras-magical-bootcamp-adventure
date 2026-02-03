import React, { useMemo } from 'react';
import { Sparkles } from 'lucide-react';
import StarField from './StarField';
import calderoImg from '../assets/caldero_magico_pixel_art_asset.png';
import hansWinsImg from '../assets/hans wins.png';

const GameOverScreen = ({ score, total, stars, onReset, onExit, reason }) => {
    // Mensajes del mago tras la derrota
    const encouragingMessages = [
        "¡Ja ja ja! Tu conocimiento no fue suficiente. Pero no desesperes, hasta los grandes magos comenzaron siendo aprendices.",
        "Has caído ante mi desafío. El HTML es poderoso, y debes dominarlo antes de enfrentarme de nuevo.",
        "Tu energía se ha agotado. Estudia más sobre las etiquetas y estructuras, luego regresa más fuerte.",
        "¡Qué decepción! Creí que tendrías más conocimiento. Pero la magia del código requiere práctica constante.",
        "Has sido derrotado, pero veo chispas de potencial en ti. Aprende de tus errores y vuelve a intentarlo.",
        "El HTML es más complejo de lo que pensabas, ¿verdad? No te preocupes, todos fallan antes de triunfar.",
        "Tu batalla ha terminado aquí, pero el conocimiento te espera. ¡Vuelve cuando estés listo!",
        "Casi lo logras, pero el Calvo Malvado no es fácil de vencer. ¡Entrena más y regresa!"
    ];

    const randomMessage = useMemo(() => {
        return encouragingMessages[Math.floor(Math.random() * encouragingMessages.length)];
    }, []);

    return (
        <div className="game-over-screen" style={{ backgroundImage: `url(${hansWinsImg})` }}>
            <div className="completion-overlay"></div>
            <StarField stars={stars} />

            <div className="game-over-content">
                <img
                    src={calderoImg}
                    alt="Caldero"
                    className="game-over-cauldron pixelated"
                />

                <h1 className="game-over-title">¡EL MAGO TE HA DERROTADO!</h1>

                <div className="game-over-reason">
                    <Sparkles size={40} color="#ef4444" />
                    <p>{randomMessage}</p>
                </div>

                <div className="game-over-stats">
                    <div className="game-over-stat-item">
                        <span className="stat-label">Respuestas Correctas</span>
                        <span className="stat-value">{score} / {total}</span>
                    </div>
                    <div className="game-over-stat-item">
                        <span className="stat-label">Porcentaje de Aciertos</span>
                        <span className="stat-value">{Math.round((score / total) * 100)}%</span>
                    </div>
                </div>

                <div className="game-over-buttons">
                    <button onClick={onReset} className="game-over-btn retry-btn">
                        🔄 Reintentar
                    </button>
                    <button onClick={onExit} className="game-over-btn exit-btn">
                        🗺️ Volver al Mapa
                    </button>
                </div>
            </div>
        </div>
    );
};

export default GameOverScreen;
