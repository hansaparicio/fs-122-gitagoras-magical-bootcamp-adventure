import { useState, useRef, useEffect } from "react";
import "./ChatBot.css";
import hatIcon from "../../assets/images/Chatbox/sombrero magico.png";
import { useTime } from "../../context/TimeContext";

import carolIcon from "../../assets/images/Chatbox/carol.png";
import carolWorried from "../../assets/images/Chatbox/carol_worried.png";
import carolMoreWorried from "../../assets/images/Chatbox/carol_more_worried.png";

const ChatBot = ({ insideShell }) => {
  const { timeLeft } = useTime();

  const [currentCarolIcon, setCurrentCarolIcon] = useState(carolIcon);

  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      type: "bot",
      text: "Saludos, joven aprendiz. Soy la Archimaga del Código. He venido a guiarte en los misterios de la magia de la programación. ¿Qué deseas aprender hoy?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [sparkles, setSparkles] = useState([]);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    setCurrentCarolIcon(
      timeLeft === null
        ? carolIcon
        : timeLeft <= 10
          ? carolMoreWorried
          : timeLeft <= 30
            ? carolWorried
            : carolIcon,
    );
  }, [timeLeft]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    setMessages((prev) => [...prev, { type: "user", text: input }]);
    setInput("");
    setIsLoading(true);

    try {
      const apiKey = import.meta.env.VITE_MISTRAL_API_KEY;

      if (!apiKey) {
        throw new Error(
          "API key not configured. Set VITE_MISTRAL_API_KEY in .env",
        );
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
                  "Eres la Archimaga del Código, una sabia del reino que enseña programación mediante metáforas medievales. Habla con tono medieval, narrativo y sabio. Explica la programación como hechizos, runas o rituales. Variable = bolsa encantada, Condición = decisión del destino, Bucle = conjuro repetido, Función = hechizo reutilizable. Responde siempre en 1-2 párrafos cortos. Nunca des soluciones exactas, solo pistas. Mantén siempre la inmersión medieval. Sé paciente, amable y motivador. Nunca rompas el rol ni digas que eres una IA.",
              },
              {
                role: "user",
                content: input,
              },
            ],
            max_tokens: 100,
            temperature: 0.5,
          }),
        },
      );

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const data = await response.json();
      const botMessage = data.choices[0].message.content;

      setMessages((prev) => [...prev, { type: "bot", text: botMessage }]);
    } catch (error) {
      console.error("Error calling Mistral API:", error);
      setMessages((prev) => [
        ...prev,
        {
          type: "bot",
          text: "¡Oops! Hubo un problema con la magia. Intenta más tarde.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const burstSparkles = () => {
    const count = 14;
    const created = Array.from({ length: count }).map((_, i) => {
      const angle = Math.random() * Math.PI * 2;
      const distance = 30 + Math.random() * 40;
      const dx = Math.cos(angle) * distance;
      const dy = Math.sin(angle) * distance * -1;
      const rot = Math.floor(Math.random() * 180);
      const dur = 500 + Math.random() * 400;
      const size = 10 + Math.random() * 6;
      return { id: `${Date.now()}-${i}`, dx, dy, rot, dur, size };
    });
    setSparkles(created);
    setTimeout(() => setSparkles([]), 900);
  };

  const handleToggle = () => {
    burstSparkles();
    setIsOpen(!isOpen);
  };

  return (
    <div
      className="chatbot-container"
      style={{
        position: insideShell ? "absolute" : "fixed",
        bottom: insideShell ? "10px" : "20px",
        right: insideShell ? "10px" : "20px",
      }}
    >
      <button
        className="chatbot-fab"
        onClick={handleToggle}
        title="Abre el chat mágico"
        style={{ position: "relative", top: 0, right: 0 }}
      >
        <div className="sparkle-layer">
          {sparkles.map((sparkle) => (
            <div
              key={sparkle.id}
              className="sparkle"
              style={{
                "--dx": `${sparkle.dx}px`,
                "--dy": `${sparkle.dy}px`,
                "--rot": `${sparkle.rot}deg`,
                "--dur": `${sparkle.dur}ms`,
                "--size": `${sparkle.size}px`,
              }}
            >
              ✦
            </div>
          ))}
        </div>

        <img src={currentCarolIcon} alt="Carol Icon" className="chatbot-icon" />
      </button>

      {isOpen && (
        <div className="chatbot-window" style={{ bottom: "110px", right: "0" }}>
          <div className="chatbot-header">
            <h3>Asistente Mágico</h3>
            <button
              className="chatbot-close"
              onClick={() => setIsOpen(false)}
              aria-label="Close chat"
            >
              ✕
            </button>
          </div>

          <div className="chatbot-messages">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`chatbot-message chatbot-message-${msg.type}`}
              >
                <div className="chatbot-message-content">
                  {msg.type === "bot" && (
                    <img
                      src={hatIcon}
                      alt="Sombrero mágico"
                      className="chatbot-message-icon"
                    />
                  )}
                  <span>{msg.text}</span>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="chatbot-message chatbot-message-bot">
                <div className="chatbot-message-content">
                  <img
                    src={hatIcon}
                    alt="Sombrero mágico"
                    className="chatbot-message-icon"
                  />
                  <span className="loading-dots">
                    <span></span>
                    <span></span>
                    <span></span>
                  </span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <form onSubmit={handleSendMessage} className="chatbot-input-form">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Escribe tu pregunta..."
              disabled={isLoading}
              className="chatbot-input"
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="chatbot-send"
            >
              ➤
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default ChatBot;
