//--------------------------------------------------------------- Zona Alquimia

/* 
import { useState, useEffect } from "react";
import AlchemyZone from "./scenes/AlchemyZone/AlchemyZone";
import AppShell from "./layout/AppShell/AppShell";
import LoaderOverlay from "./components/Loader/LoaderOverlay";
import { TimeProvider } from "./context/TimeContext";
import { GameOverProvider } from "./context/GameOverContext";
import GameOverModal from "./components/GameOverModal/GameOverModal";

function App() {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 2000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <GameOverProvider>
            <TimeProvider>
                <LoaderOverlay visible={loading} />

                <AppShell>
                    {!loading && <AlchemyZone />}
                </AppShell>

                <GameOverModal />
            </TimeProvider>
        </GameOverProvider>
    );
}

export default App; */

//---------------------------------------------------------------------- Mapa
/*
import WorldScene from "./scenes/WorldScenes/WorldScene"

function App() {

   return <WorldScene />;
}

export default App;
*/


//----------------------------------------------------------------------- Biblioteca

import AppShell from "./layout/AppShell/AppShell";

import { TimeProvider } from "./context/TimeContext";
import { GameOverProvider } from "./context/GameOverContext";
import { InventoryProvider } from "./context/InventoryContext";

import LibraryZone from "./scenes/LibraryZone/LibraryZone";

export default function App() {
    return (
        <AppShell>
            <TimeProvider>
                <GameOverProvider>
                    <InventoryProvider>
                        <LibraryZone
                            onExit={() => {
                                console.log("Salir de la Biblioteca Arcana");
                            }}
                        />
                    </InventoryProvider>
                </GameOverProvider>
            </TimeProvider>
        </AppShell>
    );
}
