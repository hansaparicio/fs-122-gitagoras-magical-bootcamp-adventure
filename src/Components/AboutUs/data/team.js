import elfIdle from "../../../assets/avatars/Eva_idle-removebg-preview.png";
import elfActive from "../../../assets/avatars/Eva_active-removebg-preview.png";
import sorcererIdle from "../../../assets/avatars/Kilian_idle-removebg-preview.png";
import sorcererActive from "../../../assets/avatars/Kilian_active-removebg-preview.png";
import wizardIdle from "../../../assets/avatars/Sorin_idle-removebg-preview.png";
import wizardActive from "../../../assets/avatars/Sorin_active-removebg-preview.png";
import paladinIdle from "../../../assets/avatars/Gustavo_idle-removebg-preview.png";
import paladinActive from "../../../assets/avatars/Gustavo_active-removebg-preview.png";

import elfBg from "../../../assets/backgrounds/elf_bg.png";
import sorcererBg from "../../../assets/backgrounds/sorcerer_bg.png";
import wizardBg from "../../../assets/backgrounds/wizard_bg.png";
import paladinBg from "../../../assets/backgrounds/paladin_bg.png";

const team = [
  {
    id: "elf",
    name: "Patatxun",
    idleImage: elfIdle,
    activeImage: elfActive,
    background: elfBg,
    dotColor: "#c56bff",
    links: [
      { label: "LinkedIn", url: "https://www.linkedin.com/in/eva-torres-guerrero-a50517386/" },
      { label: "GitHub", url: "https://github.com/torresevag/torresevag" }
    ]
  },
  {
    id: "sorcerer",
    name: "Corsidar",
    idleImage: sorcererIdle,
    activeImage: sorcererActive,
    background: sorcererBg,
    dotColor: "#ff6b6b",
    links: [
      { label: "LinkedIn", url: "https://www.linkedin.com/in/kilian-garc%C3%ADa-santana-9854b11b3/" },
      { label: "GitHub", url: "https://github.com/KilianCGS" }
    ]
  },
  {
    id: "wizard",
    name: "Code_dracula",
    idleImage: wizardIdle,
    activeImage: wizardActive,
    background: wizardBg,
    dotColor: "#6bff95",
    links: [
      { label: "LinkedIn", url: "https://www.linkedin.com/in/sorin-petru-oprean-62a473159/" },
      { label: "GitHub", url: "https://github.com/Sorin95-Dev" }
    ]
  },
  {
    id: "paladin",
    name: "Gasoto",
    idleImage: paladinIdle,
    activeImage: paladinActive,
    background: paladinBg,
    dotColor: "#6bcfff" ,
    links: [
      { label: "LinkedIn", url: "https://www.linkedin.com/in/gustavo-soto-b41017281/" },
      { label: "GitHub", url: "https://github.com/gasotof" }
    ]
  },
];

export default team;