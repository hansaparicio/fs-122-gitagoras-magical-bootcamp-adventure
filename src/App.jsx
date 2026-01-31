
import { useState } from "react";
import LoginScreen from "./scenes/LoginScreen/LoginScreen";
import BeginningChapter from "./scenes/BeginningChapter/BeginningChapter";
import TeamShowcase from "./components/AboutUs/TeamShowcase/TeamShowcase";
import CustomCursor from "./CustomCursor";
import { IdleProvider } from "./context/IdleContext";
import MusicLayout from "./layout/MusicLayout";
import { GameOverProvider } from "./context/GameOverContext";








function App() {
    const [loggedIn, setLoggedIn] = useState(false);
    const [inGame, setInGame] = useState(false);
    const [showAbout, setShowAbout] = useState(false);
    const [username, setUsername] = useState(null);

    return (
        <GameOverProvider>
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
        </GameOverProvider>

    );
}

export default App;


/*
import { useState, useEffect } from "react";
import LibraryZone from "./scenes/LibraryZone/LibraryZone";
import AppShell from "./layout/AppShell/AppShell";
import LoaderOverlay from "./components/Loader/LoaderOverlay";
import { TimeProvider } from "./context/TimeContext";

// import { useState, useEffect } from "react";
// import LibraryZone from "./scenes/LibraryZone/LibraryZone";
// import AppShell from "./layout/AppShell/AppShell";
// import LoaderOverlay from "./components/Loader/LoaderOverlay";
// import { TimeProvider } from "./context/TimeContext";

// function App() {
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setLoading(false);
//     }, 2000);
//     return () => clearTimeout(timer);
//   }, []);

//   return (
//     <TimeProvider>

//       <LoaderOverlay visible={loading} />


                {!loading && <LibraryZone />}
            </AppShell>
        </TimeProvider>
    );
}

export default App;*/
//       <AppShell>

//         {!loading && <LibraryZone />}
//       </AppShell>
//     </TimeProvider>
//   );
// }

// export default App;
import { useState } from "react";

import StackScreen from "./scenes/StackScreen/StackScreen";
import WorldScene from "./scenes/WorldScenes/WorldScene";
import MinigameMock from "./scenes/MinigameMock/MinigameMock";
import QuizGame from "./scenes/QuizGame/QuizGame";
import LoaderOverlay from "./components/loader/LoaderOverlay";

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

    const goToMinigame = (zoneId) => {
        setActiveZone(zoneId);
        setLoading(true);
        setTimeout(() => {
            setScreen("minigame");
            setLoading(false);
        }, 800);
    };

    const backToWorld = () => {
        setLoading(true);
        setTimeout(() => {
            setScreen("world");
            setLoading(false);
        }, 800);
    };

    return (
        <>
            {screen === "stack" && (
                <StackScreen onStart={goToWorld} />
            )}

            {screen === "world" && (
                <WorldScene
                    onBack={() => setScreen("stack")}
                    onEnterZone={goToMinigame}
                />
            )}

            {screen === "minigame" && activeZone === "zone_4" && (
                <QuizGame onExit={backToWorld} />
            )}

            {screen === "minigame" && activeZone !== "zone_4" && (
                <MinigameMock
                    zoneId={activeZone}
                    onExit={backToWorld}
                />
            )}

            <LoaderOverlay visible={loading} />
        </>
    );
}

export default App;
