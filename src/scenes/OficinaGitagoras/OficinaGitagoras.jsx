import { useState, useEffect } from "react";
import "./OficinaGitagoras.css";
import gitagorasImage from "../../assets/backgrounds/GitagorasOffice.jpg";
import gitagorasAvatar from "../../assets/images/GitagorasAvatar.png";

const GITAGORAS_FALLBACK = [
    "Ocupado debuggeando hechizos antiguos.",
    "No puedo, mis conjuros tienen syntax errors.",
    "Ahora no, el grimorio no compila.",
    "Ocupado con stack overflow en mis runas."
];

export default function OficinaGitagoras({ onExit }) {
    const [gitagorasDialogues, setGitagorasDialogues] = useState(GITAGORAS_FALLBACK);
    const [gitagorasIndex, setGitagorasIndex] = useState(0);
    const [gitagorasTyped, setGitagorasTyped] = useState("");
    const [gitagorasTyping, setGitagorasTyping] = useState(false);
    const [isLoadingGitagoras, setIsLoadingGitagoras] = useState(true);

    const fetchGitagorasResponse = async () => {
        try {
            const apiKey = import.meta.env.VITE_MISTRAL_API_KEY;

            if (!apiKey) {
                console.warn("API key not configured, using fallback messages");
                return GITAGORAS_FALLBACK;
            }

            const response = await fetch(
                "https://api.mistral.ai/v1/chat/completions",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${apiKey}`,
                    },
                    body: JSON.stringify({
                        model: "mistral-tiny-latest",
                        messages: [
                            {
                                role: "system",
                                content:
                                    "Eres Gitágoras, un mago anciano que programa. Genera exactamente 4 excusas MUY CORTAS (máximo 8 palabras) de por qué estás ocupado. Patrón: 'Ocupado/No puedo/Ahora no + [problema de código/debugging/compilación]'. Tono místico de mago. Ejemplos: 'Ocupado debuggeando hechizos antiguos', 'No puedo, mis runas tienen syntax errors'. NO números ni viñetas. Una frase por línea.",
                            },
                            {
                                role: "user",
                                content: "Dame 4 excusas de estar ocupado con problemas de código",
                            },
                        ],
                        max_tokens: 120,
                        temperature: 0.9,
                    }),
                },
            );

            if (!response.ok) {
                throw new Error(`API error: ${response.status}`);
            }

            const data = await response.json();
            const content = data.choices[0].message.content;

            const dialogues = content
                .split('\n')
                .map(line => line.trim())
                .filter(line => line.length > 0)
                .map(line => line.replace(/^[\d\-\*\.\)\]\}\:]+\s*/g, ''))
                .map(line => line.replace(/^\s*\d+[\.\)\-\:]\s*/g, ''));

            return dialogues.length > 0 ? dialogues : GITAGORAS_FALLBACK;
        } catch (error) {
            console.error("Error calling Mistral API:", error);
            return GITAGORAS_FALLBACK;
        }
    };

    useEffect(() => {
        fetchGitagorasResponse().then(dialogues => {
            setGitagorasDialogues(dialogues);
            setIsLoadingGitagoras(false);
        }).catch(() => {
            setIsLoadingGitagoras(false);
        });
    }, []);

    useEffect(() => {
        if (isLoadingGitagoras) return;

        const text = gitagorasDialogues[gitagorasIndex];
        if (!text) return;

        setGitagorasTyped("");
        setGitagorasTyping(true);

        let i = 0;
        const interval = setInterval(() => {
            if (i < text.length) {
                setGitagorasTyped(text.slice(0, i + 1));
                i++;
            } else {
                setGitagorasTyping(false);
                clearInterval(interval);
            }
        }, 30);

        return () => clearInterval(interval);
    }, [gitagorasIndex, gitagorasDialogues, isLoadingGitagoras]);

    const handleGitagorasContinue = () => {
        if (gitagorasTyping) {
            setGitagorasTyped(gitagorasDialogues[gitagorasIndex]);
            setGitagorasTyping(false);
            return;
        }

        if (gitagorasIndex < gitagorasDialogues.length - 1) {
            setGitagorasIndex(i => i + 1);
        } else {
            onExit();
        }
    };

    return (
        <div className="oficina-gitagoras-root">
            <div className="oficina-content">
                <img src={gitagorasImage} alt="Gitagoras" className="oficina-background-image" />
                <div className="oficina-dialog-container">
                    <img src={gitagorasAvatar} alt="Gitagoras" className="oficina-avatar" />
                    <div className="oficina-dialog-box">
                        {isLoadingGitagoras ? (
                            <p>Canalizando la sabiduría arcana...</p>
                        ) : (
                            <>
                                <p>{gitagorasTyped}</p>
                                {!gitagorasTyping && (
                                    <button className="oficina-continue-btn" onClick={handleGitagorasContinue}>
                                        Continuar
                                    </button>
                                )}
                            </>
                        )}
                    </div>
                </div>
            </div>
            <div className="oficina-actions">
                <button className="oficina-btn" onClick={onExit}>
                    VOLVER AL MAPA
                </button>
            </div>
        </div>
    );
}
