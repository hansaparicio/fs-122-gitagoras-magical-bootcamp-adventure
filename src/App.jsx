import { useState, useEffect } from "react";
import LibraryZone from "./scenes/LibraryZone/LibraryZone";
import AppShell from "./layout/AppShell/AppShell";
import LoaderOverlay from "./components/Loader/LoaderOverlay";
import { TimeProvider } from "./context/TimeContext";
import { GameOverProvider } from "./context/GameOverContext";
import GameOverModal from "./components/GameOverModal/GameOverModal";

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
                <LoaderOverlay visible={loading} />

                <AppShell>
                    {!loading && <LibraryZone />}
                </AppShell>

                <GameOverModal />
            </TimeProvider>
        </GameOverProvider>
    );
}

export default App;
