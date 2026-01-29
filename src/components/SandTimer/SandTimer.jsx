import SandImg from "../../assets/images/SandHourglass.png";
import { useTime } from "../../context/TimeContext";
import "./SandTimer.css";

export default function SandTimer() {
  const { timeLeft } = useTime();


  const timerClass =
    timeLeft === null ? "" :
      timeLeft <= 10 ? "danger" :
        timeLeft <= 30 ? "warning" :
          "";

  const mins = Math.floor(timeLeft / 60);
  const secs = timeLeft % 60;

  return (
    <div className={`sand-timer ${timerClass}`}>
      <img src={SandImg} alt="Reloj de arena" />
      <span>{`${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`}</span>
    </div>
  );
}
