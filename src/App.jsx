/* import { useEffect, useState } from "react";

import LoginScreen from "./scenes/LoginScreen/LoginScreen";
import BeginningChapter from "./scenes/BeginningChapter/BeginningChapter";
import StackScreen from "./scenes/StackScreen/StackScreen";
import LoaderOverlay from "./components/Loader/LoaderOverlay";

function App() {
    const [screen, setScreen] = useState("login");
    const [loggedIn, setLoggedIn] = useState(false);
    const [scrollSigned, setScrollSigned] = useState(false);
    const [loading, setLoading] = useState(false);

    const goWithLoader = (nextScreen) => {
        setLoading(true);
        setTimeout(() => {
            setScreen(nextScreen);
            setLoading(false);
        }, 1200);
    };

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) return;

        fetch("http://127.0.0.1:5000/api/me", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then(res => res.ok ? res.json() : null)
            .then(data => {
                if (!data) return;
                setLoggedIn(true);
                setScrollSigned(data.scroll_signed);
                setScreen("login");
            });
    }, []);

    const handleStartGame = () => {
        if (scrollSigned) {
            goWithLoader("stack");
        } else {
            setScreen("beginning");
        }
    };

    if (screen === "login") {
        return (
            <>
                <LoaderOverlay visible={loading} />
                <LoginScreen
                    loggedIn={loggedIn}
                    onLogin={() => setLoggedIn(true)}
                    onLogout={() => {
                        localStorage.removeItem("token");
                        setLoggedIn(false);
                        setScrollSigned(false);
                        setScreen("login");
                    }}
                    onStartGame={handleStartGame}
                />
            </>
        );
    }

    if (screen === "beginning") {
        return (
            <>
                <LoaderOverlay visible={loading} />
                <BeginningChapter
                    onFinish={() => {
                        setScrollSigned(true);
                        goWithLoader("stack");
                    }}
                />
            </>
        );
    }

    if (screen === "stack") {
        return (
            <>
                <LoaderOverlay visible={loading} />
                <StackScreen
                    onStart={() => {
                        console.log("Aquí irá el mapa");
                    }}
                    onBackToMenu={() => {
                        setScreen("login");
                    }}
                />
            </>
        );
    }

    return null;
}

export default App; */


//------------------------------------------------------------------



/* import AppShell from "./layout/AppShell/AppShell";
import AlchemyZone from "./scenes/AlchemyZone/AlchemyZone";

import { InventoryProvider } from "./context/InventoryContext";
import { TimeProvider } from "./context/TimeContext";
import { GameOverProvider } from "./context/GameOverContext";
import { IdleProvider } from "./context/IdleContext";

function App() {
    return (
        <IdleProvider>
            <GameOverProvider>
                <TimeProvider>
                    <InventoryProvider>
                        <AppShell onExitZone={() => { }}>
                            <AlchemyZone />
                        </AppShell>
                    </InventoryProvider>
                </TimeProvider>
            </GameOverProvider>
        </IdleProvider>
    );
}

export default App;  */

import BeginningChapter from "./scenes/BeginningChapter/BeginningChapter";

function App() {
    return <BeginningChapter />;

}

export default App;
