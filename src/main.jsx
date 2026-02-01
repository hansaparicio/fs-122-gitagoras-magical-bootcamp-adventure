import { InventoryProvider } from "./context/InventoryContext";

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
