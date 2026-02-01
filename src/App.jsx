import { useState, useEffect } from "react";
import SceneRouter from "./scenes/WorldScenes/SceneRouter";
import LoaderOverlay from "./Components/Loader/LoaderOverlay";
import { TimeProvider } from "./context/TimeContext";
import { GameOverProvider } from "./context/GameOverContext";
import CustomCursor from "./CustomCursor";

function App() {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 2000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <GameOverProvider>
            <TimeProvider>
                <CustomCursor />
                <LoaderOverlay visible={loading} />

                {!loading && <SceneRouter />}
            </TimeProvider>
        </GameOverProvider>
    );
}

export default App;
