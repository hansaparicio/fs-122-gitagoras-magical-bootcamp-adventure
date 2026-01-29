import AudioPlayer from "@madzadev/audio-player";
import "@madzadev/audio-player/dist/index.css";
import "./mp3Player.css";

import magic from "../../assets/Music/Coding Magic Adventure.mp3";
import kingdom from "../../assets/Music/Kingdom of Little Code.mp3";
import lateNight from "../../assets/Music/Late Night Code.mp3";
import happy from "../../assets/Music/Happy Gitagoras.mp3";
import arcane from "../../assets/Music/Arcane Algorithm.mp3";
import pixel from "../../assets/Music/Pixel Cave.mp3";

const audioTracks = [
    { url: magic, title: "Magic Coding Adventure", tags: [] },
    { url: lateNight, title: "Late Night Coding", tags: [] },
    { url: happy, title: "Happy Gitagoras Code", tags: [] },
    { url: kingdom, title: "Kingdom of Code", tags: [] },
    { url: arcane, title: "Arcane Algorithm", tags: [] },
    { url: pixel, title: "Pixel Cave", tags: [] },
];



const Player = () => (
    <div className="audio-player">
        <div style={{ marginTop: "2rem" }}>
            <AudioPlayer
                trackList={audioTracks}
                includeSearch={false}
                includeTags={false}
                showPlaylist={false}

            />
        </div>
    </div>
);

export default Player;
