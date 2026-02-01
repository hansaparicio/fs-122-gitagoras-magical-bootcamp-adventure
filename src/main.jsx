import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";

import { IdleProvider } from "./context/IdleContext";
import { TimeProvider } from "./context/TimeContext";
import { GameOverProvider } from "./context/GameOverContext";

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <GameOverProvider>
            <TimeProvider>
                <IdleProvider>
                    <App />
                </IdleProvider>
            </TimeProvider>
        </GameOverProvider>
    </StrictMode>
);
