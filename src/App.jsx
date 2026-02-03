import { useState, useEffect } from "react";
import SceneRouter from "./scenes/WorldScenes/SceneRouter";
import LoaderOverlay from "./Components/Loader/LoaderOverlay";
import { TimeProvider } from "./context/TimeContext";
import { GameOverProvider } from "./context/GameOverContext";
import CustomCursor from "./CustomCursor";

function App() {
    const [loggedIn, setLoggedIn] = useState(false);
    const [inGame, setInGame] = useState(false);
    const [showAbout, setShowAbout] = useState(false);

    const [screen, setScreen] = useState("intro");
    const [loading, setLoading] = useState(false);
    const [activeZone, setActiveZone] = useState(null);

    const [user, setUser] = useState(null);
    const [avatar, setAvatar] = useState(null);
    const [showUserPanel, setShowUserPanel] = useState(false);
    const [showAvatarCreator, setShowAvatarCreator] = useState(false);





    useEffect(() => {
        const fetchMe = async () => {
            const token = localStorage.getItem("token");
            if (!token) return;

            try {
                const res = await fetch("http://127.0.0.1:5000/api/me", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (!res.ok) return;

                const data = await res.json();
                setUser(data);
                setAvatar(data.avatar);
                setLoggedIn(true);
            } catch (err) {
                console.error("Error cargando usuario", err);
            }
        };

        fetchMe();
    }, []);


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
        setUser(null);
        setAvatar(null);
    };


    return (
        <GameOverProvider>
            <TimeProvider>
                <CustomCursor />
                <LoaderOverlay visible={loading} />

                {!loading && <SceneRouter />}
            </TimeProvider>
        </GameOverProvider>
    );
}

export default App;
