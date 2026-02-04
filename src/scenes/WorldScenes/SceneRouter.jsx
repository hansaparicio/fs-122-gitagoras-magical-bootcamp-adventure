import WorldScene from "./WorldScene";
import AlchemyZone from "../AlchemyZone/AlchemyZone";
import LibraryZone from "../LibraryZone/LibraryZone";
import QuizGame from "../GardenZone/QuizGame";
import Iframe from "../StudyZone/Iframe";
import ChaosOffice from "../ChaosOffice/ChaosOffice";

import AppShell from "../../layout/AppShell/AppShell";

/**
 * SceneRouter
 * Decide qué escena mostrar según `currentScene`
 */
export default function SceneRouter({ currentScene, setScene }) {

    const goToWorld = () => setScene("world");

    switch (currentScene) {

        case "world":
            return (
                <WorldScene
                    onEnterZone={(zoneId) => setScene(zoneId)}
                    onBack={() => setScene("stack")}
                />
            );


        case "Alchemy_Lab":
            return (
                <AppShell onExit={goToWorld}>
                    <AlchemyZone onExitZone={goToWorld} />
                </AppShell>
            );

        case "Library":
            return (
                <AppShell onExit={goToWorld}>
                    <LibraryZone onExitZone={goToWorld} />
                </AppShell>
            );
        case "Wizard_Office":
            return <ChaosOffice onExit={goToWorld} />;


        case "Garden_Courtyard":
            return (
                <AppShell onExit={goToWorld}>
                    <QuizGame />
                </AppShell>
            );

        case "Study_Room":
            return (
                <Iframe onExit={goToWorld} />
            );


        default:
            return (
                <WorldScene
                    onEnterZone={(zoneId) => setScene(zoneId)}
                    onBack={() => setScene("stack")}
                />
            );

    }
}
