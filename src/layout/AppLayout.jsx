
import Mp3Player from "../components/mp3Player/mp3Player";
import "./AppLayout.css";



export default function AppLayout({ children }) {


    return (
        <>
            {children}
            <div className="global-player">

                <button className="music-button">MUSIC</button>

                <div className="player">
                    <Mp3Player />
                </div>


            </div>

        </>
    );
}