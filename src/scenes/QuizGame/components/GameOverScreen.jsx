import React, { useMemo } from 'react';
import { Sparkles } from 'lucide-react';
import StarField from './StarField';
import calderoImg from '../assets/caldero_magico_pixel_art_asset.png';
import laboratorioImg from '../assets/laboratorio.png';

const GameOverScreen = ({ score, total, stars, onReset, onExit, reason }) => {
    // Mensajes alentadores aleatorios
    const encouragingMessages = [
        "¡No te rindas! Cada intento te hace más fuerte.",
        "El conocimiento se construye con práctica. ¡Sigue adelante!",
        "Los grandes magos también fallaron al principio.",
        "Cada error es una oportunidad para aprender.",
        "¡Estás más cerca de dominar HTML! Inténtalo de nuevo.",
        "La perseverancia es la clave del éxito.",
        "¡Casi lo logras! Un intento más y lo conseguirás.",
        "Aprender lleva tiempo, pero lo estás haciendo genial."
    ];

    const randomMessage = useMemo(() => {
        return encouragingMessages[Math.floor(Math.random() * encouragingMessages.length)];
    }, []);

    return (
        <div className="game-over-screen" style={{ backgroundImage: `url(${laboratorioImg})` }}>
            <div className="completion-overlay"></div>
            <StarField stars={stars} />

            <div className="game-over-content">
                <img
                    src={calderoImg}
                    alt="Caldero"
                    className="game-over-cauldron pixelated"
                />

                <h1 className="game-over-title">Has perdido la batalla</h1>

                <div className="game-over-reason">
                    <Sparkles size={40} color="#fbbf24" />
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
                        Reintentar
                    </button>
                    <button onClick={onExit} className="game-over-btn exit-btn">
                        Salir
                    </button>
                </div>
            </div>
        </div>
    );
};

export default GameOverScreen;
