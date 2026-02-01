
import { useState } from "react";
import LoginScreen from "./scenes/LoginScreen/LoginScreen";
import BeginningChapter from "./scenes/BeginningChapter/BeginningChapter";
import TeamShowcase from "./components/AboutUs/TeamShowcase/TeamShowcase";
import CustomCursor from "./CustomCursor";
import { IdleProvider } from "./context/IdleContext";
import MusicLayout from "./layout/MusicLayout";

function App() {
    const [loggedIn, setLoggedIn] = useState(false);
    const [inGame, setInGame] = useState(false);
    const [showAbout, setShowAbout] = useState(false);

    return (
        <IdleProvider>
            <CustomCursor />

            <MusicLayout>
                {!inGame && !showAbout && (
                    <LoginScreen
                        loggedIn={loggedIn}
                        onStartGame={() => setInGame(true)}
                        onLogout={() => setLoggedIn(false)}
                        onAbout={() => setShowAbout(true)}
                        onLogin={() => setLoggedIn(true)}
                    />
                )}

                {showAbout && !inGame && (
                    <TeamShowcase onBack={() => setShowAbout(false)} />
                )}

                {inGame && <BeginningChapter />}
            </MusicLayout>
        </IdleProvider>
    );
}

export default App;




/*import { useState } from "react";
import "./App.css";
import LoginScreen from "./scenes/LoginScreen/LoginScreen";
import BeginningChapter from "./scenes/BeginningChapter/BeginningChapter";
import LibraryZone from "./scenes/LibraryZone/LibraryZone";
import TeamShowcase from "./components/AboutUs/TeamShowcase";
import QuizzGame from "./scenes/QuizGame/QuizGame";
import CustomCursor from "./CustomCursor";
//--------------------------------------------------------------- Zona Alquimia

/* 
import { useState, useEffect } from "react";
import AlchemyZone from "./scenes/AlchemyZone/AlchemyZone";
import AppShell from "./layout/AppShell/AppShell";
import LoaderOverlay from "./components/Loader/LoaderOverlay";
import { TimeProvider } from "./context/TimeContext";
import { GameOverProvider } from "./context/GameOverContext";
import GameOverModal from "./components/GameOverModal/GameOverModal";

function App() {
    const [loggedIn, setLoggedIn] = useState(false);
    const [inGame, setInGame] = useState(false);
    const [showAbout, setShowAbout] = useState(false);
    const [showQuizz, setShowQuizz] = useState(false);
    const [completedBeginning, setCompletedBeginning] = useState(false);

    return (
        <TimeProvider>
            <>
                <CustomCursor />

                {!inGame && !showAbout && !showQuizz && !completedBeginning && (
                    <LoginScreen
                        onLogin={() => setLoggedIn(true)}
                        loggedIn={loggedIn}
                        onStartGame={() => setInGame(true)}
                        onLogout={() => setLoggedIn(false)}
                        onAbout={() => setShowAbout(true)}
                        onQuizz={() => setShowQuizz(true)}
                    />
                )}

                {showAbout && !inGame && !showQuizz && (
                    <TeamShowcase onBack={() => setShowAbout(false)} />
                )}

                {showQuizz && !inGame && !showAbout && (
                    <QuizzGame onExit={() => setShowQuizz(false)} />
                )}

                {inGame && !showQuizz && !showAbout && !completedBeginning && (
                    <BeginningChapter onComplete={() => setCompletedBeginning(true)} />
                )}

                {inGame && !showQuizz && !showAbout && completedBeginning && (
                    <LibraryZone />
                )}
            </>
        </TimeProvider>
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
                    {!loading && <AlchemyZone />}
                </AppShell>

                <GameOverModal />
            </TimeProvider>
        </GameOverProvider>
    );
}

export default App;

//---------------------------------------------------------------------- Mapa
/*
import WorldScene from "./scenes/WorldScenes/WorldScene"

function App() {

   return <WorldScene />;
}

export default App;
export default App;



//----------------------------------------------------------------------- Biblioteca

import AppShell from "./layout/AppShell/AppShell";

import { TimeProvider } from "./context/TimeContext";
import { GameOverProvider } from "./context/GameOverContext";
import { InventoryProvider } from "./context/InventoryContext";

import LibraryZone from "./scenes/LibraryZone/LibraryZone";

export default function App() {
    return (
        <AppShell>
            <TimeProvider>
                <GameOverProvider>
                    <InventoryProvider>
                        <LibraryZone
                            onExit={() => {
                                console.log("Salir de la Biblioteca Arcana");
                            }}
                        />
                    </InventoryProvider>
                </GameOverProvider>
            </TimeProvider>
        </AppShell>
    );
}
