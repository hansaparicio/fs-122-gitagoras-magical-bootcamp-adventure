import WorldScene from "./WorldScene";
import AlchemyZone from "../AlchemyZone/AlchemyZone";

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
    }
}