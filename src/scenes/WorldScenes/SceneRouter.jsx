import { useState } from "react";

import StackScreen from "../StackScreen/StackScreen";
import WorldScene from "../WorldScenes/WorldScene";

import AlchemyZone from "../AlchemyZone/AlchemyZone";
import LibraryZone from "../LibraryZone/LibraryZone";
import QuizGame from "../QuizGame/QuizGame";
import Iframe from "../StudyZone/Iframe";

import AppShell from "../../layout/AppShell/AppShell";

export default function SceneRouter() {
    const [scene, setScene] = useState("stack");


    const goToWorld = () => setScene("world");
    const goToZone = (zoneId) => setScene(zoneId);

    switch (scene) {

        case "stack":
            return <StackScreen onStart={goToWorld} />;


        case "world":
            return (
                <WorldScene
                    onBack={() => setScene("stack")}
                    onEnterZone={goToZone}
                />
            );


        case "Alchemy_Lab":
            return (
                <AppShell onExit={goToWorld}>
                    <AlchemyZone />
                </AppShell>
            );

        case "Library":
            return (
                <AppShell onExit={goToWorld}>
                    <LibraryZone />
                </AppShell>
            );

        case "Garden_Courtyard":
            return (
                <AppShell onExit={goToWorld}>
                    <QuizGame />
                </AppShell>
            );


        case "Study_Room":
            return <Iframe onExit={goToWorld} />;


        default:
            return <WorldScene onBack={() => setScene("stack")} onEnterZone={goToZone} />;
    }
}