import { useState } from "react";
import { useInventory } from "../../context/InventoryContext";
import SandTimer from "../../components/SandTimer/SandTimer";
import ChatBot from "../../components/ChatBot/ChatBot";
import GrimorioModal from "../../components/Grimorios/GrimorioModal";
import "./AppShell.css";

export default function AppShell({ children, onExit }) {
    const [showInventory, setShowInventory] = useState(false);
    const [openGrimoire, setOpenGrimoire] = useState(null);
    const { inventory } = useInventory();

    return (
        <div className="app-shell">
            <div className="shell-top">
                <button
                    className="shell-left"
                    onClick={() => setShowInventory(v => !v)}
                >
                    INVENTARIO
                </button>

                {showInventory && (
                    <div className="inventory-panel">
                        {inventory.length === 0 ? (
                            <div className="inventory-empty">Bolsa vacía</div>
                        ) : (
                            <div className="inventory-bar">
                                {inventory.map(grimoire => (
                                    <img
                                        key={grimoire.id}
                                        src={grimoire.image}
                                        alt={grimoire.hover}
                                        title={grimoire.hover}
                                        className="inventory-item"
                                        onClick={() => setOpenGrimoire(grimoire)}
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                )}

                <SandTimer />


            </div>

            <div className="scene-content">{children}</div>

            <div className="shell-bottom">
                <div className="shell-left" onClick={onExit}>SALIR DE LA ZONA</div>
                <div className="shell-right">
                    <ChatBot insideShell />
                </div>
            </div>

            {openGrimoire && (
                <GrimorioModal
                    grimoire={openGrimoire}
                    onClose={() => setOpenGrimoire(null)}
                />
            )}
        </div>
    );
}
