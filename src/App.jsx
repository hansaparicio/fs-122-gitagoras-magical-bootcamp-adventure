
import { useState } from "react";
import "./App.css";
import LoginScreen from "./scenes/LoginScreen/LoginScreen";
import BeginningChapter from "./scenes/BeginningChapter/BeginningChapter";
import LibraryZone from "./scenes/LibraryZone/LibraryZone";
import TeamShowcase from "./components/AboutUs/TeamShowcase";
import QuizzGame from "./scenes/QuzzGame/QuizzGame";
import CustomCursor from "./CustomCursor";
import { TimeProvider } from "./context/TimeContext";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [inGame, setInGame] = useState(false);
  const [showAbout, setShowAbout] = useState(false);
  const [showQuizz, setShowQuizz] = useState(false);
  const [completedBeginning, setCompletedBeginning] = useState(false);

  return (
    <TimeProvider>
      <>
        <CustomCursor />

      {!inGame && !showAbout && !showQuizz && !completedBeginning && (
        <LoginScreen
          onLogin={() => setLoggedIn(true)}
          loggedIn={loggedIn}
          onStartGame={() => setInGame(true)}
          onLogout={() => setLoggedIn(false)}
          onAbout={() => setShowAbout(true)}
          onQuizz={() => setShowQuizz(true)}
        />
      )}

      {showAbout && !inGame && !showQuizz && (
        <TeamShowcase onBack={() => setShowAbout(false)} />
      )}

      {showQuizz && !inGame && !showAbout && (
        <QuizzGame onExit={() => setShowQuizz(false)} />
      )}

      {inGame && !showQuizz && !showAbout && !completedBeginning && (
        <BeginningChapter onComplete={() => setCompletedBeginning(true)} />
      )}

      {inGame && !showQuizz && !showAbout && completedBeginning && (
        <LibraryZone />
      )}
      </>
    </TimeProvider>
  );
}

export default App;
