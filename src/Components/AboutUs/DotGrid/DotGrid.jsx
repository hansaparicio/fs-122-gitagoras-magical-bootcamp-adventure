import "./DotGrid.css";

function DotGrid({ color = "#000000", visible = true, opacity = 0.08, animation = "drift" }) {
  if (!visible) return null;

  return (
    <div
      className={`dot-grid ${animation}`}
      style={{
        "--dot-color": color,
        opacity: opacity,
        filter: "blur(0.5px)"
      }}
    />
  );
}

export default DotGrid;