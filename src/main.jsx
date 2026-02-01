import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";
import { InventoryProvider } from "./context/InventoryContext";
import { GameOverProvider } from "./context/GameOverContext";
import { TimeProvider } from "./context/TimeContext";
import { IdleProvider } from "./context/IdleContext";


ReactDOM.createRoot(document.getElementById("root")).render(
    <InventoryProvider>
        <GameOverProvider>
            <TimeProvider>
                <IdleProvider>
                    <App />
                </IdleProvider>
            </TimeProvider>
        </GameOverProvider>
    </InventoryProvider>
);
