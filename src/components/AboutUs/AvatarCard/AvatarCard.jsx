function AvatarCard({
  id,
  name,
  idleImage,
  activeImage,
  links,
  isActive,
  isBlurred,
  onActivate
}) {
  const imageToShow = isActive ? activeImage : idleImage;

  return (
    <div 
      className={`avatar-card ${isActive ? "active" : ""} ${isBlurred ? "blurred" : ""}`} 
      onClick={(e) => onActivate(id, e)}
    >
      <img src={imageToShow} alt={name} />
      <p>{name}</p>
      
      {isActive && links && (
        <div className="avatar-links">
          {links.map((link, index) => (
            <a key={index} href={link.url} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}>
              {link.label}
            </a>
          ))}
        </div>
      )}
    </div>
  );
}

export default AvatarCard;