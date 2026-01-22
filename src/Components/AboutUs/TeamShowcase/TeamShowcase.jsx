import DotGrid from "../DotGrid/DotGrid";
import { useState } from "react";
import team from "../../data/team";
import AvatarCard from "../AvatarCard/AvatarCard";
import "./TeamShowcase.css";

function TeamShowcase() {
  const [activeAvatarId, setActiveAvatarId] = useState(null);

  const activeAvatar = team.find((member) => member.id === activeAvatarId);

  const mainBackgroundStyle = activeAvatar
    ? {
        backgroundImage: `url(${activeAvatar.background})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }
    : { backgroundColor: "#ffffff" };

  const handleActivate = (id) => {
    setActiveAvatarId((prevId) => (prevId === id ? null : id));
  };

  return (
    <section
      className="team-showcase"
      style={{ ...mainBackgroundStyle}}
    >
      <DotGrid
        visible={true}
        color={activeAvatar?.dotColor || "#000000"}
        opacity={activeAvatar ? 0.18 : 0.08}
      />
      <h2>Our Team</h2>

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
