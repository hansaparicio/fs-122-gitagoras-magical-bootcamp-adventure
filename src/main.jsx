import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

import { InventoryProvider } from "./context/InventoryContext";
import { GameOverProvider } from "./context/GameOverContext";
import { IdleProvider } from "./context/IdleContext";
import { TimeProvider } from "./context/TimeContext";
import MusicLayout from "./layout/MusicLayout";

ReactDOM.createRoot(document.getElementById("root")).render(
    <InventoryProvider>
        <GameOverProvider>
            <TimeProvider>
                <MusicLayout>
                    <IdleProvider>
                        <App />
                    </IdleProvider>
                </MusicLayout>
            </TimeProvider>
        </GameOverProvider>
    </InventoryProvider>
);

