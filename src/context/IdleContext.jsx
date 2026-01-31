import { createContext, useContext, useEffect, useState, useRef } from 'react';

const IdleContext = createContext();

export function IdleProvider({ children }) {
    const [isIdle, setIsIdle] = useState(false);
    const timerRef = useRef(null);

    useEffect(() => {
        const reset = () => {
            clearTimeout(timerRef.current);
            setIsIdle(false);
            timerRef.current = setTimeout(() => {
                setIsIdle(true)
            },
                10000);
        };
        window.addEventListener("mousemove", reset);
        window.addEventListener("keydown", reset);
        window.addEventListener("click", reset);

        reset();

        return () => {
            clearTimeout(timerRef.current);
            window.removeEventListener("mousemove", reset);
            window.removeEventListener("keydown", reset);
            window.removeEventListener("click", reset);
        };

    }, []);

    return (
        <IdleContext.Provider value={{ isIdle }}>
            {children}
        </IdleContext.Provider>

    )

}
export function useIdle() {
    return useContext(IdleContext);
}
