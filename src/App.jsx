import { useState } from "react";
import LoginScreen from "./scenes/LoginScreen/LoginScreen";
import BeginningChapter from "./scenes/BeginningChapter/BeginningChapter";
import TeamShowcase from "./components/AboutUs/TeamShowcase/TeamShowcase";
import CustomCursor from "./CustomCursor";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [inGame, setInGame] = useState(false);
  const [showAbout, setShowAbout] = useState(false);

  return (
    <>
      <CustomCursor />

      {!inGame && !showAbout && (
        <LoginScreen
          loggedIn={loggedIn}
          onStartGame={() => setInGame(true)}
          onLogout={() => setLoggedIn(false)}
          onAbout={() => setShowAbout(true)}
        />
      )}

      {showAbout && !inGame && (
        <TeamShowcase onBack={() => setShowAbout(false)} />
      )}

      {inGame && <BeginningChapter />}
    </>
  );
}

export default App;

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


//       <AppShell>

//         {!loading && <LibraryZone />}
//       </AppShell>
//     </TimeProvider>
//   );
// }

// export default App;
