/* 

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

export default function App() {
    return (
        <BrowserRouter>
            <AppRoutes />
        </BrowserRouter>
    );
} 
 */

//       <AppShell>

//         {!loading && <LibraryZone />}
//       </AppShell>
//     </TimeProvider>
//   );
// }

// export default App;

