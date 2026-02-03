import { useState } from "react";

import LoginScreen from "./scenes/LoginScreen/LoginScreen";
import TeamShowcase from "./components/AboutUs/TeamShowcase/TeamShowcase";
import BeginningChapter from "./scenes/BeginningChapter/BeginningChapter";

import StackScreen from "./scenes/StackScreen/StackScreen";
import WorldScene from "./scenes/WorldScenes/WorldScene";

import AlchemyZone from "./scenes/AlchemyZone/AlchemyZone";
import LibraryZone from "./scenes/LibraryZone/LibraryZone";
import QuizGame from "./scenes/GardenZone/QuizGame";
import Iframe from "./scenes/StudyZone/Iframe";

import AppShell from "./layout/AppShell/AppShell";
import MusicLayout from "./layout/MusicLayout";
import LoaderOverlay from "./components/loader/LoaderOverlay";
import CustomCursor from "./CustomCursor";

import GameOverModal from "./components/GameOverModal/GameOverModal";
import OptionMenu from "./layout/Options/OptionMenu";
import { IdleProvider } from "./context/IdleContext";
import { TimeProvider } from "./context/TimeContext";
import { GameOverProvider } from "./context/GameOverContext";

function App() {
    const [loggedIn, setLoggedIn] = useState(false);
    const [inGame, setInGame] = useState(false);
    const [showAbout, setShowAbout] = useState(false);

    const [screen, setScreen] = useState("intro");
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

    const exitZoneSafely = () => {
        setLoading(true);
        setTimeout(() => {
            setScreen("world");
            setActiveZone(null);
            setLoading(false);
        }, 800);
    };

    const backToLogin = () => {
        setLoading(true);
        setTimeout(() => {
            setInGame(false);
            setLoggedIn(false);
            setShowAbout(false);
            setScreen("intro");
            setActiveZone(null);
            setLoading(false);
        }, 800);
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        setLoggedIn(false);
    };


    return (
        <IdleProvider>
            <GameOverProvider>
                <TimeProvider>
                    <CustomCursor />
                    <MusicLayout>
                        <OptionMenu />

                        {!inGame && !showAbout && (
                            <LoginScreen
                                loggedIn={loggedIn}
                                onLogin={() => setLoggedIn(true)}
                                onLogout={handleLogout}
                                onAbout={() => setShowAbout(true)}
                                onStartGame={() => setInGame(true)}
                            />
                        )}

                        {showAbout && !inGame && (
                            <TeamShowcase onBack={() => setShowAbout(false)} />
                        )}

                        {inGame && screen === "intro" && (
                            <BeginningChapter
                                onFinish={() => {
                                    setLoading(true);
                                    setTimeout(() => {
                                        setScreen("stack");
                                        setLoading(false);
                                    }, 800);
                                }}
                            />
                        )}

                        {inGame && screen !== "intro" && (
                            <>
                                {screen === "stack" && (
                                    <StackScreen
                                        onStart={goToWorld}
                                        onBackToMenu={backToLogin}
                                    />
                                )}

                                {screen === "world" && (
                                    <WorldScene
                                        onBack={() => setScreen("stack")}
                                        onEnterZone={goToZone}
                                    />
                                )}

                                {screen === "zone" && activeZone === "Alchemy_Lab" && (
                                    <AppShell onExit={exitZoneSafely}>
                                        <AlchemyZone onExitZone={exitZoneSafely} />
                                    </AppShell>
                                )}

                                {screen === "zone" && activeZone === "Library" && (
                                    <AppShell onExit={exitZoneSafely}>
                                        <LibraryZone onExit={exitZoneSafely} />
                                    </AppShell>
                                )}

                                {screen === "zone" && activeZone === "Garden_Courtyard" && (
                                    <AppShell onExit={exitZoneSafely}>
                                        <QuizGame />
                                    </AppShell>
                                )}

                                {screen === "zone" && activeZone === "Study_Room" && (
                                    <Iframe onExit={exitZoneSafely} />
                                )}
                            </>
                        )}

                        <GameOverModal />
                        <LoaderOverlay visible={loading} />
                    </MusicLayout>
                </TimeProvider>
            </GameOverProvider>
        </IdleProvider>
    );
}

export default App;
