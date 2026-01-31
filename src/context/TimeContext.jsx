import { createContext, useContext, useEffect, useRef, useState } from "react";
import { useGameOver } from "./GameOverContext";

const TimeContext = createContext();

export function TimeProvider({ children }) {
    const { showGameOver } = useGameOver();

    const [timeLeft, setTimeLeft] = useState(null);
    const intervalRef = useRef(null);

    const startTimer = (seconds) => {
        clearInterval(intervalRef.current);
        setTimeLeft(seconds);

        intervalRef.current = setInterval(() => {
            setTimeLeft(prev => {
                if (prev <= 1) {
                    clearInterval(intervalRef.current);
                    showGameOver();
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
    };

    const stopTimer = () => {
        clearInterval(intervalRef.current);
        setTimeLeft(null);
    };

    useEffect(() => {
        return () => clearInterval(intervalRef.current);
    }, []);

    return (
        <TimeContext.Provider value={{ timeLeft, startTimer, stopTimer }}>
            {children}
        </TimeContext.Provider>
    );
}

export function useTime() {
    return useContext(TimeContext);
}
