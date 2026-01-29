import { useState } from "react";
import SandTimer from "../../components/SandTimer/SandTimer";
import Player from "../../components/mp3Player/mp3Player";
import ChatBot from "../../components/ChatBot/ChatBot";
import "./AppShell.css";

export default function AppShell({ children }) {
    const [showAudio, setShowAudio] = useState(false);

    const toggleAudio = () => setShowAudio((prev) => !prev);

    return (
        <div className="app-shell">
            <div className="shell-top">
                <div className="shell-left">INVENTARIO</div>
                <SandTimer />
                <div className="shell-right">
                    <button
                        onClick={toggleAudio}
                        className="audio-toggle-button"
                        style={{
                            background: "rgba(245, 216, 140, 0.9)",
                            border: "3px solid #4aa3ff",
                            borderRadius: "10px",
                            padding: "10px 14px",
                            color: "black",
                            fontSize: "14px",
                            cursor: "pointer",
                            pointerEvents: "auto",
                            fontFamily: "Press Start 2P, cursive",
                        }}

                    >
                        AUDIO
                    </button>
                    {showAudio && (
                        <div
                            className="audio-container"
                            style={{
                                position: "absolute",
                                top: "60px",
                                right: "10px",
                                zIndex: 800,

                                padding: "0,8rem",
                                borderRadius: "8px",
                                boxShadow: "0 4px 10px rgba(255, 255, 255, 0.3)",
                                fontFamily: "Press Start 2P, cursive",
                            }}
                        >
                            <Player />
                        </div>
                    )}
                </div>
            </div>

            <div className="scene-content">{children}</div>

            <div className="shell-bottom">
                <div className="shell-left">SALIR DE LA ZONA</div>
                <div className="shell-right">
                    <ChatBot insideShell />
                </div>
            </div>
        </div>
    );
}

