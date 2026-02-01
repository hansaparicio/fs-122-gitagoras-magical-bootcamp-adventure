import { useState } from "react";

/* Screens */
import LoginScreen from "./scenes/LoginScreen/LoginScreen";
import BeginningChapter from "./scenes/BeginningChapter/BeginningChapter";
import StackScreen from "./scenes/StackScreen/StackScreen";
import WorldScene from "./scenes/WorldScenes/WorldScene";

/* UI */
import Loader from "./components/Loader/LoaderOverlay";

/* Contexts */
import { IdleProvider } from "./context/IdleContext";

/* Screen enum */
const SCREENS = {
    LOGIN: "LOGIN",
    BEGINNING: "BEGINNING",
    STACK: "STACK",
    WORLD: "WORLD",
};

export default function App() {
    const [screen, setScreen] = useState(SCREENS.LOGIN);
    const [loading, setLoading] = useState(false);
    const [loggedIn, setLoggedIn] = useState(false);

    const goTo = (nextScreen, delay = 1200) => {
        setLoading(true);
        setTimeout(() => {
            setScreen(nextScreen);
            setLoading(false);
        }, delay);
    };

    return (
        <IdleProvider>
            {loading && <Loader />}

            {!loading && (
                <>
                    {screen === SCREENS.LOGIN && (
                        <LoginScreen
                            loggedIn={loggedIn}
                            onLogin={() => {
                                setLoggedIn(true);
                                goTo(SCREENS.BEGINNING);
                            }}
                            onLogout={() => {
                                setLoggedIn(false);
                                setScreen(SCREENS.LOGIN);
                            }}
                            onStartGame={() => goTo(SCREENS.BEGINNING)}
                            onAbout={() => console.log("About us")}
                        />
                    )}

                    {screen === SCREENS.BEGINNING && (
                        <BeginningChapter
                            onSignScroll={() => goTo(SCREENS.STACK)}
                        />
                    )}

                    {screen === SCREENS.STACK && (
                        <StackScreen
                            onBackToMenu={() => goTo(SCREENS.LOGIN)}
                            onStart={() => goTo(SCREENS.WORLD)}
                        />
                    )}

                    {screen === SCREENS.WORLD && (
                        <WorldScene
                            onBack={() => goTo(SCREENS.STACK)}
                            onEnterZone={(zoneId) => {
                                console.log("Entrando en zona:", zoneId);
                                // aquí luego: AlchemyZone, LibraryZone, etc
                            }}
                        />
                    )}
                </>
            )}
        </IdleProvider>
    );
}
