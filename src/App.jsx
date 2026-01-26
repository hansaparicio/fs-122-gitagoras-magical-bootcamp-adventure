
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

export default App;

// ----------------------------------------------------------------------------

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






import StackScreen from "./scenes/StackScreen/StackScreen";

function App() {
    return <StackScreen />;
}

export default App; */


import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, useNavigate, Navigate } from "react-router-dom";

import LoginScreen from "./scenes/LoginScreen/LoginScreen";
import BeginningChapter from "./scenes/BeginningChapter/BeginningChapter";
import StackScreen from "./scenes/StackScreen/StackScreen";
import LoaderOverlay from "./components/Loader/LoaderOverlay";

import LockedMagicModal from "./components/LockedMagicModal/LockedMagicModal";
import BlockedStackRoute from "./components/BlockedStackRoute";

function AppRoutes() {
    const navigate = useNavigate();

    const [loggedIn, setLoggedIn] = useState(false);
    const [scrollSigned, setScrollSigned] = useState(false);
    const [loading, setLoading] = useState(false);
    const [lockedModal, setLockedModal] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("token");
        const signed = localStorage.getItem("scrollSigned") === "true";

        if (token) {
            setLoggedIn(true);
            setScrollSigned(signed);
        }
    }, []);

    const showLoaderAndNavigate = (path) => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            navigate(path);
        }, 1800);
    };

    const handleLogin = () => setLoggedIn(true);

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("scrollSigned");
        setLoggedIn(false);
        setScrollSigned(false);
        navigate("/login");
    };

    const handleEnterWorld = () => {
        showLoaderAndNavigate(scrollSigned ? "/stacks" : "/beginning");
    };

    const handleFinishBeginning = () => {
        localStorage.setItem("scrollSigned", "true");
        setScrollSigned(true);
        showLoaderAndNavigate("/stacks");
    };

    return (
        <>
            <Routes>
                <Route
                    path="/login"
                    element={
                        <LoginScreen
                            loggedIn={loggedIn}
                            onLogin={handleLogin}
                            onStartGame={handleEnterWorld}
                            onLogout={handleLogout}
                        />
                    }
                />

                <Route
                    path="/beginning"
                    element={
                        scrollSigned
                            ? <Navigate to="/stacks" replace />
                            : <BeginningChapter onFinish={handleFinishBeginning} />
                    }
                />

                <Route
                    path="/stacks"
                    element={
                        <StackScreen
                            onBackToMenu={() => showLoaderAndNavigate("/login")}
                        />
                    }
                />

                <Route
                    path="/stacks/:forbidden"
                    element={
                        <BlockedStackRoute
                            onBlocked={() => setLockedModal(true)}
                        />
                    }
                />

                <Route path="*" element={<Navigate to="/login" replace />} />
            </Routes>

            <LockedMagicModal
                visible={lockedModal}
                onClose={() => setLockedModal(false)}
            />

            <LoaderOverlay visible={loading} />
        </>
    );
}

export default function App() {
    return (
        <BrowserRouter>
            <AppRoutes />
        </BrowserRouter>
    );
}
