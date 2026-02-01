import { createContext, useContext, useState } from "react";

const GameOverContext = createContext();

export function GameOverProvider({ children }) {
    const [visible, setVisible] = useState(false);
    const [onRetry, setOnRetry] = useState(null);
    const [onExit, setOnExit] = useState(null);

    const registerGameOverActions = ({ onRetry, onExit }) => {
        setOnRetry(() => onRetry);
        setOnExit(() => onExit);
    };

    const showGameOver = () => {
        setVisible(true);
    };

    const hideGameOver = () => {
        setVisible(false);
    };

    return (
        <GameOverContext.Provider
            value={{
                visible,
                onRetry,
                onExit,
                showGameOver,
                hideGameOver,
                registerGameOverActions
            }}
        >
            {children}
        </GameOverContext.Provider>
    );
}

export function useGameOver() {
    return useContext(GameOverContext);
}
