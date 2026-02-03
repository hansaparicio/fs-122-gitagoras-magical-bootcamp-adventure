import { createContext, useContext, useEffect, useRef, useState } from "react";
import { useGameOver } from "./GameOverContext";

const TimeContext = createContext();

export function TimeProvider({ children }) {
    const { showGameOver } = useGameOver();

    const [timeLeft, setTimeLeft] = useState(null);
    const [active, setActive] = useState(false);
    const intervalRef = useRef(null);

    const startTimer = (seconds) => {
        clearInterval(intervalRef.current);
        setActive(true);
        setTimeLeft(seconds);

        intervalRef.current = setInterval(() => {
            setTimeLeft(prev => {
                if (prev <= 1) {
                    clearInterval(intervalRef.current);
                    intervalRef.current = null;
                    setActive(false);
                    showGameOver();
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
    };

    const stopTimer = () => {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
        setTimeLeft(null);
        setActive(false);
    };

    useEffect(() => {
        return () => clearInterval(intervalRef.current);
    }, []);

    return (
        <TimeContext.Provider value={{ timeLeft, startTimer, stopTimer, active }}>
            {children}
        </TimeContext.Provider>
    );
}

export function useTime() {
    return useContext(TimeContext);
}
