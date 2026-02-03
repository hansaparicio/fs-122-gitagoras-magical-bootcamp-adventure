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

import zoneEnterSoundSrc from "./assets/sounds/zone-enter.mp3";
import interactSoundSrc from "./assets/sounds/interact.mp3";

const BASE_WIDTH = 1480;
const BASE_HEIGHT = 982;

const GITAGORAS_FALLBACK = [
  "¡Saludos, aprendiz! Soy Gitágoras. Ahora mismo estoy MUY ocupado.",
  "Estoy alineando los astros del código.",
  "Vuelve luego, aprendiz."
];

export default function WorldScene({ onBack, onEnterZone }) {
  const canvasRef = useRef(null);
  const [scale, setScale] = useState(1);
  const [fontReady, setFontReady] = useState(false);
  const [showGitagoras, setShowGitagoras] = useState(false);
  const [gitagorasDialogues] = useState(GITAGORAS_FALLBACK);
  const [gitagorasIndex, setGitagorasIndex] = useState(0);
  const [gitagorasTyped, setGitagorasTyped] = useState("");
  const [gitagorasTyping, setGitagorasTyping] = useState(false);

  useEffect(() => {
    const updateScale = () =>
      setScale(
        Math.min(
          window.innerWidth / BASE_WIDTH,
          window.innerHeight / BASE_HEIGHT,
          1
        )
      );

    updateScale();
    window.addEventListener("resize", updateScale);
    return () => window.removeEventListener("resize", updateScale);
  }, []);

  useEffect(() => {
    document.fonts
      .load("16px 'Press Start 2P'")
      .finally(() => setFontReady(true));
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

      zoneManager = new ZoneManager([
        new Zone({ id: "Alchemy_Lab", x: 260, y: 310, width: 50, height: 50 }),
        new Zone({ id: "Astronomy", x: 700, y: 310, width: 50, height: 50 }),
        new Zone({ id: "Wizard_Office", x: 1166, y: 310, width: 50, height: 50 }),
        new Zone({ id: "Library", x: 500, y: 600, width: 50, height: 20 }),
        new Zone({ id: "Study_Room", x: 725, y: 480, width: 50, height: 20 }),
        new Zone({ id: "Garden_Courtyard", x: 950, y: 750, width: 30, height: 50 })
      ]);

      requestAnimationFrame(loop);
    });

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

      const inputState = input.getState();
      const next = player.calculateNextPosition(inputState, dt);
      player.applyPosition(next);
      player.updateAnimation(dt, next.moving);

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

        if (activeZone.id === "Wizard_Office") {
          setGitagorasIndex(0);
          setShowGitagoras(true);
        } else {
          onEnterZone(activeZone.id);
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

  return (
    <div className="worldscene-root">
      <div
        className="worldscene-scale"
        style={{ transform: `scale(${scale})` }}
      >
        <div className="worldscene-container">
          <canvas
            ref={canvasRef}
            width={BASE_WIDTH}
            height={BASE_HEIGHT}
            className="worldscene-canvas"
          />



          <button onClick={onBack} className="worldscene-back">
            Volver a <br />selección <br />de magia
          </button>
        </div>
      </div>
    </div>
  );

}