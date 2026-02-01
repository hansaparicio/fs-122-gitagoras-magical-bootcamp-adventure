import { useRef, useEffect, useState } from "react";

import Player from "./core/entities/Player";
import KeyboardController from "./core/input/KeyboardController";
import NavMask from "./core/world/NavMask";
import Zone from "./core/world/Zone";
import ZoneManager from "./core/world/ZoneManager";

import "./WorldScene.css";

import bgImageSrc from "./assets/bg_world.png";
import studentMageSprite from "./assets/student_mage.png";
import navMaskSrc from "./assets/nav_mask.png";
import gitagorasImage from "../../assets/backgrounds/Gitagoras.jpeg";
import gitagorasAvatar from "../../assets/images/GitagorasAvatar.png";

import zoneEnterSoundSrc from "./assets/sounds/zone-enter.mp3";
import interactSoundSrc from "./assets/sounds/interact.mp3";

const BASE_WIDTH = 1480;
const BASE_HEIGHT = 982;
const PARTICLE_COUNT = 60;
const SPARK_COUNT = 24;

const GITAGORAS_FALLBACK = [
  "Ocupado debuggeando hechizos antiguos.",
  "No puedo, mis conjuros tienen syntax errors.",
  "Ahora no, el grimorio no compila.",
  "Ocupado con stack overflow en mis runas."
];

export default function WorldScene({ stackId, onBack, onEnterZone }) {
  const canvasRef = useRef(null);
  const [scale, setScale] = useState(1);
  const [fontReady, setFontReady] = useState(false);

  const [showGitagoras, setShowGitagoras] = useState(false);
  const [gitagorasDialogues, setGitagorasDialogues] = useState(GITAGORAS_FALLBACK);
  const [gitagorasIndex, setGitagorasIndex] = useState(0);
  const [gitagorasTyped, setGitagorasTyped] = useState("");
  const [gitagorasTyping, setGitagorasTyping] = useState(false);
  const [isLoadingGitagoras, setIsLoadingGitagoras] = useState(false);

  // Función para obtener respuestas de Gitagoras usando la API
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

      // Dividir el contenido en frases y limpiar números y viñetas
      const dialogues = content
        .split('\n')
        .map(line => line.trim())
        .filter(line => line.length > 0)
        .map(line => line.replace(/^[\d\-\*\.\)\]\}\:]+\s*/g, '')) // Eliminar números, guiones, asteriscos, puntos, paréntesis, etc.
        .map(line => line.replace(/^\s*\d+[\.\)\-\:]\s*/g, '')); // Segunda pasada para patrones como "1.", "1)", "1-", "1:"

      return dialogues.length > 0 ? dialogues : GITAGORAS_FALLBACK;
    } catch (error) {
      console.error("Error calling Mistral API:", error);
      return GITAGORAS_FALLBACK;
    }
  };

  useEffect(() => {
    const updateScale = () => {
      setScale(
        Math.min(
          window.innerWidth / BASE_WIDTH,
          window.innerHeight / BASE_HEIGHT,
          1
        )
      );
    };
    updateScale();
    window.addEventListener("resize", updateScale);
    return () => window.removeEventListener("resize", updateScale);
  }, []);

  useEffect(() => {
    document.fonts
      .load("16px 'Press Start 2P'")
      .then(() => setFontReady(true));
  }, []);

  useEffect(() => {
    if (!fontReady) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.imageSmoothingEnabled = false;

    const background = new Image();
    background.src = bgImageSrc;

    const playerImage = new Image();
    playerImage.src = studentMageSprite;

    const navMaskImage = new Image();
    navMaskImage.src = navMaskSrc;

    const zoneEnterSound = new Audio(zoneEnterSoundSrc);
    zoneEnterSound.volume = 0.35;

    const interactSound = new Audio(interactSoundSrc);
    interactSound.volume = 0.4;

    const input = new KeyboardController();

    let player;
    let zoneManager;
    let activeZone = null;
    let lastTime = 0;
    let wasInteractPressed = false;
    let dialogueStartTime = 0;

    const particles = Array.from({ length: PARTICLE_COUNT }, () => ({
      x: Math.random() * BASE_WIDTH,
      y: Math.random() * BASE_HEIGHT,
      r: 1 + Math.random() * 2,
      speed: 10 + Math.random() * 20,
      phase: Math.random() * Math.PI * 2
    }));

    function createSpark(cx, cy) {
      const a = Math.random() * Math.PI * 2;
      const s = 30 + Math.random() * 40;
      return {
        x: cx,
        y: cy,
        vx: Math.cos(a) * s,
        vy: Math.sin(a) * s,
        life: 0.4,
        maxLife: 0.4,
        size: 1 + Math.random()
      };
    }

    const sparks = Array.from({ length: SPARK_COUNT }, () =>
      createSpark(BASE_WIDTH / 2, BASE_HEIGHT / 2)
    );

    Promise.all([
      new Promise(r => (background.onload = r)),
      new Promise(r => (playerImage.onload = r)),
      new Promise(r => (navMaskImage.onload = r))
    ]).then(() => {
      const navMask = new NavMask(navMaskImage, BASE_WIDTH, BASE_HEIGHT);

      player = new Player({
        x: 550,
        y: 380,
        image: playerImage,
        scale: 3.5,
        navMask
      });

      const zones = [
        new Zone({ id: "zone_1", type: "1", x: 268, y: 310, width: 50, height: 50 }),
        new Zone({ id: "zone_2", type: "2", x: 700, y: 310, width: 50, height: 50 }),
        new Zone({ id: "zone_3", type: "3", x: 1166, y: 310, width: 50, height: 50 }),
        new Zone({ id: "zone_4", type: "4", x: 950, y: 680, width: 50, height: 50 }),
        new Zone({ id: "zone_5", type: "5", x: 720, y: 600, width: 50, height: 50 })
      ];

      zoneManager = new ZoneManager(zones);
      requestAnimationFrame(loop);
    });

    function drawParticles(dt) {
      ctx.fillStyle = "rgba(255,255,255,0.6)";
      particles.forEach(p => {
        p.y -= p.speed * dt;
        p.x += Math.sin(p.phase += 0.01) * 0.2;
        if (p.y < -10) {
          p.y = BASE_HEIGHT + 10;
          p.x = Math.random() * BASE_WIDTH;
        }
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      });
    }

    function updateSparks(dt) {
      const cx =
        player.position.x + (player.spriteWidth * player.scale) / 2;
      const cy =
        player.position.y + player.spriteHeight * player.scale * 0.8;

      sparks.forEach((s, i) => {
        s.x += s.vx * dt;
        s.y += s.vy * dt;
        s.life -= dt;
        if (s.life <= 0) {
          sparks[i] = createSpark(cx, cy);
        }
      });
    }

    function drawSparks() {
      sparks.forEach(s => {
        const a = Math.max(s.life / s.maxLife, 0);
        ctx.fillStyle = `rgba(200,235,255,${a})`;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        ctx.fill();
      });
    }

    function drawDialogue(ts) {
      const t = Math.min((ts - dialogueStartTime) / 250, 1);
      const yOffset = (1 - t) * 10;

      const w = 260;
      const h = 44;

      const cx =
        player.position.x + (player.spriteWidth * player.scale) / 2;
      const x = cx - w / 2;
      const y = player.position.y - h - 20 + yOffset;

      ctx.globalAlpha = t;
      ctx.fillStyle = "rgba(255,255,255,0.85)";
      ctx.fillRect(x, y, w, h);
      ctx.strokeStyle = "#000";
      ctx.lineWidth = 3;
      ctx.strokeRect(x, y, w, h);

      ctx.font = "10px 'Press Start 2P'";
      ctx.fillStyle = "#000";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText("PULSA PARA ACCEDER", x + w / 2 - 18, y + h / 2);

      ctx.save();
      ctx.translate(x + w - 24, y + h / 2);
      ctx.fillStyle = "#fff";
      ctx.fillRect(-12, -9, 24, 18);
      ctx.strokeRect(-12, -9, 24, 18);
      ctx.fillStyle = "#000";
      ctx.fillText("E", 0, 1);
      ctx.restore();

      ctx.globalAlpha = 1;
    }

    function loop(ts) {
      if (!lastTime) lastTime = ts;
      const dt = (ts - lastTime) / 1000;
      lastTime = ts;

      ctx.clearRect(0, 0, BASE_WIDTH, BASE_HEIGHT);
      ctx.drawImage(background, 0, 0);

      drawParticles(dt);

      const inputState = input.getState();
      const next = player.calculateNextPosition(inputState, dt);
      player.applyPosition(next);
      player.updateAnimation(dt, next.moving);

      updateSparks(dt);
      drawSparks();

      const feet = player.getFeetPosition();
      const transition = zoneManager.update(feet.x, feet.y);

      if (transition?.entered) {
        activeZone = transition.entered;
        dialogueStartTime = ts;
        zoneEnterSound.currentTime = 0;
        zoneEnterSound.play();
      }

      if (transition?.exited) activeZone = null;

      if (inputState.interact && !wasInteractPressed && activeZone) {
        interactSound.currentTime = 0;
        interactSound.play();
        if (activeZone.id === "zone_3") {
          setGitagorasIndex(0);
          setGitagorasDialogues(GITAGORAS_FALLBACK); // Establecer fallback inmediatamente
          setIsLoadingGitagoras(true);
          setShowGitagoras(true);

          // Llamar a la API para obtener diálogos dinámicos
          fetchGitagorasResponse().then(dialogues => {
            setGitagorasDialogues(dialogues);
            setIsLoadingGitagoras(false);
          }).catch(() => {
            setIsLoadingGitagoras(false); // Asegurar que se desactiva loading incluso si falla
          });
        } else {
          onEnterZone?.(activeZone.id);
        }
      }

      wasInteractPressed = inputState.interact;

      ctx.drawImage(
        player.image,
        player.frameX * player.spriteWidth,
        player.frameY * player.spriteHeight,
        player.spriteWidth,
        player.spriteHeight,
        player.position.x,
        player.position.y,
        player.spriteWidth * player.scale,
        player.spriteHeight * player.scale
      );

      if (activeZone) drawDialogue(ts);

      requestAnimationFrame(loop);
    }

  }, [fontReady, onEnterZone]);

  // Typing effect para diálogos de Gitágoras
  useEffect(() => {
    if (!showGitagoras || isLoadingGitagoras) return;

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
  }, [showGitagoras, gitagorasIndex, gitagorasDialogues, isLoadingGitagoras]);

  const handleGitagorasContinue = () => {
    if (gitagorasTyping) {
      setGitagorasTyped(gitagorasDialogues[gitagorasIndex]);
      setGitagorasTyping(false);
      return;
    }

    if (gitagorasIndex < gitagorasDialogues.length - 1) {
      setGitagorasIndex(i => i + 1);
    } else {
      setShowGitagoras(false);
      setGitagorasIndex(0);
    }
  };

  return (
    <div className="worldscene-root">
      <div className="worldscene-scale" style={{ transform: `scale(${scale})` }}>
        <div className="worldscene-container">
          <canvas
            ref={canvasRef}
            width={BASE_WIDTH}
            height={BASE_HEIGHT}
            className="worldscene-canvas"
          />

          {showGitagoras && (
            <div className="worldscene-overlay">
              <button
                className="worldscene-back-to-map"
                onClick={() => setShowGitagoras(false)}
              >
                VOLVER
              </button>
              <div className="worldscene-image-modal">
                <img src={gitagorasImage} alt="Gitagoras" className="worldscene-gitagoras-image" />
                <div className="dialog-container">
                  <img src={gitagorasAvatar} alt="Gitagoras" className="dialog-avatar" />
                  <div className="dialog-box">
                    {isLoadingGitagoras ? (
                      <p>Canalizando la sabiduría arcana...</p>
                    ) : (
                      <>
                        <p>{gitagorasTyped}</p>
                        {!gitagorasTyping && (
                          <button className="dialog-btn" onClick={handleGitagorasContinue}>
                            Continuar
                          </button>
                        )}
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}