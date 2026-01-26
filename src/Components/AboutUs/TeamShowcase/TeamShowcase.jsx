import { useState } from "react";
import DotGrid from "../DotGrid/DotGrid";
import team from "../data/team";
import AvatarCard from "../AvatarCard/AvatarCard";
import defaultBackground from "../../../assets/backgrounds/backgroundAboutUs.png";
import "./TeamShowcase.css";
import GlitchText from "../components/GlitchText/GlitchText";

function TeamShowcase() {
  const [activeAvatarId, setActiveAvatarId] = useState(null);

  const activeAvatar = team.find((member) => member.id === activeAvatarId);

  const mainBackgroundStyle = activeAvatar
    ? {
      backgroundImage: `url(${activeAvatar.background})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      backgroundColor: "#000000",
    }
    : {
      backgroundImage: `url(${defaultBackground})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      backgroundColor: "#000000",
    };

  const handleActivate = (id) => {
    setActiveAvatarId((prevId) => (prevId === id ? null : id));
  };

  const handleGoBack = () => {
    window.location.reload();
  };

  return (
    <section className="team-showcase" style={mainBackgroundStyle}>
      <button className="back-button" onClick={handleGoBack}>
        ← Back
      </button>

      <DotGrid
        visible={true}
        color={activeAvatar?.dotColor || "#ffffff"}
        opacity={activeAvatar ? 0.12 : 0.3}
      />

      <GlitchText
        speed={1}
        enableShadows
        enableOnHover={false}
        className="team-title"
      >
        Our Team
      </GlitchText>

      <div className="avatar-container">
        {team.map((member) => (
          <AvatarCard
            key={member.id}
            id={member.id}
            name={member.name}
            idleImage={member.idleImage}
            activeImage={member.activeImage}
            links={member.links}
            isActive={activeAvatarId === member.id}
            isBlurred={activeAvatarId !== null && activeAvatarId !== member.id}
            onActivate={handleActivate}
          />
        ))}
      </div>
    </section>
  );
}

export default TeamShowcase;
