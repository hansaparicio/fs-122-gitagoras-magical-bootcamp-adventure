import { useState } from "react";

import StackScreen from "./scenes/StackScreen/StackScreen";
import WorldScene from "./scenes/WorldScenes/WorldScene";

import AlchemyZone from "./scenes/AlchemyZone/AlchemyZone";
import LibraryZone from "./scenes/LibraryZone/LibraryZone";
import QuizGame from "./scenes/QuizGame/QuizGame";
import Iframe from "./scenes/StudyZone/Iframe";

import AppShell from "./layout/AppShell/AppShell";
import LoaderOverlay from "./components/loader/LoaderOverlay";

import { TimeProvider } from "./context/TimeContext";
import { GameOverProvider } from "./context/GameOverContext";
import { IdleProvider } from "./context/IdleContext";

function App() {
    const [screen, setScreen] = useState("stack");
    const [loading, setLoading] = useState(false);
    const [activeZone, setActiveZone] = useState(null);

    const goToWorld = () => {
        setLoading(true);
        setTimeout(() => {
            setScreen("world");
            setLoading(false);
        }, 800);
    };

    const goToZone = (zoneId) => {
        setActiveZone(zoneId);
        setLoading(true);
        setTimeout(() => {
            setScreen("zone");
            setLoading(false);
        }, 800);
    };

    const backToWorld = () => {
        setLoading(true);
        setTimeout(() => {
            setScreen("world");
            setActiveZone(null);
            setLoading(false);
        }, 800);
    };

    return (
        <GameOverProvider>
            <IdleProvider>
                <TimeProvider>

                    {screen === "stack" && (
                        <StackScreen onStart={goToWorld} />
                    )}

                    {screen === "world" && (
                        <WorldScene
                            onBack={() => setScreen("stack")}
                            onEnterZone={goToZone}
                        />
                    )}

                    {screen === "zone" && activeZone === "Alchemy_Lab" && (
                        <AppShell onExit={backToWorld}>
                            <AlchemyZone />
                        </AppShell>
                    )}

                    {screen === "zone" && activeZone === "Library" && (
                        <AppShell onExit={backToWorld}>
                            <LibraryZone />
                        </AppShell>
                    )}

                    {screen === "zone" && activeZone === "Garden_Courtyard" && (
                        <AppShell onExit={backToWorld}>
                            <QuizGame />
                        </AppShell>
                    )}

                    {screen === "zone" && activeZone === "Study_Room" && (
                        <Iframe onExit={backToWorld} />
                    )}

                    <LoaderOverlay visible={loading} />

                </TimeProvider>
            </IdleProvider>
        </GameOverProvider>
    );
}

export default App;