import React from 'react'
import AudioPlayer from "@madzadev/audio-player";

import magic from "../assets/Music/Coding Magic Adventure.mp3";
import kingdom from "../assets/Music/Kingdom of Little Code.mp3";
import lateNight from "../assets/Music/Late Night Code.mp3";
import happy from "../assets/Music/Happy Gitagoras.mp3";
import arcane from "../assets/Music/Arcane Algorithm.mp3";
import pixel from "../assets/Music/Pixel Cave.mp3";

const audioTracks = [
    {
        url: magic,
        title: "Magic Coding Adventure",
        tags: [],
    },
    {
        url: lateNight,
        title: "Late Night Coding",
        tags: [],
    },
    {
        url: happy,
        title: "Happy Gitagoras Code",
        tags: [],
    },

    {
        url: kingdom,
        title: "Kingdom of Code",
        tags: [],
    },
    {
        url: arcane,
        title: "Arcane Algorithm",
        tags: [],
    },
    {
        url: pixel,
        title: "Pixel Cave",
        tags: [],
    },

]

const colors = {

    backgroundColor: "transparent",
    playerBackground: "transparent",
    titleColor: "#d4ce1d",
    timeColor: "#d4ce1d",
    progressSlider: "#d4ce1d",
    progressUsed: "#ffffff",
    progressLeft: "#ecececff",
    bufferLoaded: "#3b3f53ff",
    volumeSlider: "#d4ce1d",
    volumeUsed: "#ffffff",
    volumeLeft: "#3b3f53ff",

};

const Player = () => {
    return (
        <div className="audio-player">

            <div style={{ marginTop: '2rem' }}>
                <AudioPlayer
                    trackList={audioTracks}
                    includeSearch={false}
                    includeTags={false}
                    showPlaylist={false}
                    customColorScheme={colors} />

            </div>
        </div>
    )
}

export default Player
