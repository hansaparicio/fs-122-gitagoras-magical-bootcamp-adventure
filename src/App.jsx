<<<<<<< HEAD
=======
/* 

import { useState } from "react";
import LoginScreen from "./scenes/LoginScreen/LoginScreen";
import BeginningChapter from "./scenes/BeginningChapter/BeginningChapter";
import TeamShowcase from "./components/AboutUs/TeamShowcase/TeamShowcase";
import CustomCursor from "./CustomCursor";
import { IdleProvider } from "./context/IdleContext";






function App() {
    const [loggedIn, setLoggedIn] = useState(false);
    const [inGame, setInGame] = useState(false);
    const [showAbout, setShowAbout] = useState(false);
    const [username, setUsername] = useState(null);

    return (

        <IdleProvider>
            <CustomCursor />

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
        </IdleProvider>

    );
}

export default App; */

// ----------------------------------------------------------------------------
export default App;


/*
import { useState, useEffect } from "react";
import LibraryZone from "./scenes/LibraryZone/LibraryZone";
import AppShell from "./layout/AppShell/AppShell";
import LoaderOverlay from "./components/Loader/LoaderOverlay";
import { TimeProvider } from "./context/TimeContext";
import { GameOverProvider } from "./context/GameOverContext";
import GameOverModal from "./components//GameOverModal/GameOverModal";

// import { useState, useEffect } from "react";
// import LibraryZone from "./scenes/LibraryZone/LibraryZone";
// import AppShell from "./layout/AppShell/AppShell";
// import LoaderOverlay from "./components/Loader/LoaderOverlay";
// import { TimeProvider } from "./context/TimeContext";

// function App() {
//   const [loading, setLoading] = useState(true);

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
//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setLoading(false);
//     }, 2000);
//     return () => clearTimeout(timer);
//   }, []);

//   return (
//     <TimeProvider>

//       <LoaderOverlay visible={loading} />



//---------------------------------


/* import StackScreen from "./scenes/StackScreen/StackScreen";

function App() {
    return <StackScreen />;
}

export default App;  */
//-----------------------------------

/*import { useState, useEffect } from "react";
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
    const handleFinishBeginning = async () => {
        setLoading(true);

        try {
            await fetch("http://localhost:5000/api/sign-scroll", {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`,
                    "Content-Type": "application/json"
                }
            });

            setScrollSigned(true);
            showLoaderAndNavigate("/stacks");

        } catch (err) {
            console.error("Error al firmar el pergamino", err);
            setLoading(false);
        }
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
 */
export default App;*/
//       <AppShell>

//         {!loading && <LibraryZone />}
//       </AppShell>
//     </TimeProvider>
//   );
// }

// export default App;
>>>>>>> origin/Most-updated-branch-(28/01/26)
