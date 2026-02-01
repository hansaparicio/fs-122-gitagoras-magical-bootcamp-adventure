import { useState } from "react";

import SceneRouter from "./scenes/WorldScenes/SceneRouter";
import LoaderOverlay from "./components/loader/LoaderOverlay";

import { TimeProvider } from "./context/TimeContext";
import { GameOverProvider } from "./context/GameOverContext";
import { InventoryProvider } from "./context/InventoryContext";

function App() {
    const [scene, setScene] = useState("stack");
    const [loading, setLoading] = useState(false);

    const changeScene = (next) => {
        setLoading(true);
        setTimeout(() => {
            setScene(next);
            setLoading(false);
        }, 600);
    };

    return (
        <GameOverProvider>
            <TimeProvider>
                <InventoryProvider>
                    <SceneRouter
                        currentScene={scene}
                        setScene={changeScene}
                    />

                    <LoaderOverlay visible={loading} />
                </InventoryProvider>
            </TimeProvider>
        </GameOverProvider>
    );
}

export default App;