import { useState } from "react";
import LoginScreen from "./scenes/LoginScreen/LoginScreen";
import CustomCursor from "./CustomCursor";
import ChatBot from "./components/ChatBot/ChatBot";
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
            <ChatBot />

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
