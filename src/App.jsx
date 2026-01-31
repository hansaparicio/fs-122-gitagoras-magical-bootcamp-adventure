
import { useState } from "react";
import LoginScreen from "./scenes/LoginScreen/LoginScreen";
import BeginningChapter from "./scenes/BeginningChapter/BeginningChapter";
import TeamShowcase from "./components/AboutUs/TeamShowcase/TeamShowcase";
import CustomCursor from "./CustomCursor";
import { IdleProvider } from "./context/IdleContext";
import AppLayout from "./layout/AppLayout";







function App() {
    const [loggedIn, setLoggedIn] = useState(false);
    const [inGame, setInGame] = useState(false);
    const [showAbout, setShowAbout] = useState(false);
    const [username, setUsername] = useState(null);

    return (

        <IdleProvider>
            <CustomCursor />
            <AppLayout>

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
            </AppLayout>
        </IdleProvider>


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
