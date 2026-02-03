import WorldScene from "./WorldScene";
import AlchemyZone from "../AlchemyZone/AlchemyZone";
import LibraryZone from "../LibraryZone/LibraryZone";
import QuizGame from "../GardenZone/QuizGame";
import Iframe from "../StudyZone/Iframe";

import AppShell from "../../layout/AppShell/AppShell";

export default function SceneRouter() {
    const [scene, setScene] = useState("stack");


    const goToWorld = () => setScene("world");
    const goToZone = (zoneId) => setScene(zoneId);

    switch (scene) {

        case "stack":
            return <StackScreen onStart={goToWorld} />;

export default function SceneRouter({ currentScene, setScene }) {
    switch (currentScene) {
        case "zone_1":
            return <AlchemyZone onBack={() => setScene("world")} />;

        case "world":
        default:
            return (
                <WorldScene
                    onEnterZone={(zoneId) => setScene(zoneId)}
                    onBack={() => { }}
                />
            );


        case "zone_1":
        case "Alchemy_Lab":
            return (
                <AppShell onExit={goToWorld}>
                    <AlchemyZone />
                </AppShell>
            );

        case "zone_2":
        case "Library":
            return (
                <AppShell onExit={goToWorld}>
                    <LibraryZone />
                </AppShell>
            );

        case "zone_4":
        case "Garden_Courtyard":
            return (
                <AppShell onExit={goToWorld}>
                    <QuizGame onExit={goToWorld} />
                </AppShell>
            );


        case "zone_5":
        case "Study_Room":
            return <Iframe onExit={goToWorld} />;


        default:
            return <WorldScene onBack={() => setScene("stack")} onEnterZone={goToZone} />;
    }
}