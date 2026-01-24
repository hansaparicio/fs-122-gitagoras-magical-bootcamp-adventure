
/*import { useState } from "react";
import LoginScreen from "./scenes/LoginScreen/LoginScreen";
import CustomCursor from "./CustomCursor";
import "./App.css";
import BeginningChapter from "./scenes/BeginningChapter/BeginningChapter";



function App() {
    const [loggedIn, setLoggedIn] = useState(false);
    const [inGame, setInGame] = useState(false);
    const [username, setUsername] = useState("");

    const handleLogin = (user) => {
        setLoggedIn(true);
        setUsername(user);
    };

    const handleStartGame = () => {
        setInGame(true);
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        setLoggedIn(false);
        setInGame(false);
        setUsername("");
    };

    return (
        <>
            <CustomCursor />

            {!inGame && (
                <LoginScreen

                    onLogin={handleLogin}
                    loggedIn={loggedIn}
                    onStartGame={handleStartGame}
                    onLogout={handleLogout}
                />

            )}
            {inGame && <BeginningChapter />}

        </>
    );
}

export default App; */



import { useState, useEffect } from "react";
import LibraryZone from "./scenes/LibraryZone/LibraryZone";
import AppShell from "./layout/AppShell/AppShell";
import LoaderOverlay from "./components/Loader/LoaderOverlay";
import { TimeProvider } from "./context/TimeContext";

function App() {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 2000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <TimeProvider>

            <LoaderOverlay visible={loading} />


            <AppShell>

                {!loading && <LibraryZone />}
            </AppShell>
        </TimeProvider>
    );
}

export default App;


