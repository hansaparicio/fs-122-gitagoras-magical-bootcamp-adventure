
import { useEffect, useState } from "react";

import LoginScreen from "./scenes/LoginScreen/LoginScreen";
import BeginningChapter from "./scenes/BeginningChapter/BeginningChapter";
import StackScreen from "./scenes/StackScreen/StackScreen";
import LoaderOverlay from "./components/Loader/LoaderOverlay";
import { GameOverProvider } from "./context/GameOverContext";

import MusicLayout from "./layout/MusicLayout";
import CustomCursor from "./CustomCursor";
import { IdleProvider } from "./context/IdleContext";

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
            .then((res) => (res.ok ? res.json() : null))
            .then((data) => {
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

    return (
        <GameOverProvider>
            <IdleProvider>
                <MusicLayout>
                    <CustomCursor />
                    <LoaderOverlay visible={loading} />

                    {screen === "login" && (
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
                    )}

                    {screen === "beginning" && (
                        <BeginningChapter
                            onFinish={() => {
                                setScrollSigned(true);
                                goWithLoader("stack");
                            }}
                        />
                    )}

                    {screen === "stack" && (
                        <StackScreen
                            onStart={() => {
                                console.log("Aquí irá el mapa");
                            }}
                            onBackToMenu={() => {
                                setScreen("login");
                            }}
                        />
                    )}
                </MusicLayout>
            </IdleProvider>
        </GameOverProvider>
    );
}

export default App;
