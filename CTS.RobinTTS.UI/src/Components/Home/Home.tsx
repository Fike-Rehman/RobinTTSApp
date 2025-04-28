import "./Home.css";
import TTSDataGrid from "../TTSDataGrid/TTSDataGrid";
import robinLogo from '../../assets/Images/RobinLogo.svg';
import VoiceCharacterCard from "../VoiceCharacterCard/VoiceCharacterCard";

const Home = () => {
    return (
        <div className="home-container">
            <header className="header-section">
                <div className="logo-container">
                    <img className="robin-logo" src={robinLogo} alt="Robin Logo" ></img>
                </div>
                <div className="voice-character-container">
                    <VoiceCharacterCard
                        imageUrl="/Avatars/Dorothy.png"
                        name="Dorothy"
                        gender="Female"
                        origin="English (UK)"
                    />
                    <VoiceCharacterCard
                        imageUrl="/Avatars/George.png"
                        name="George"
                        gender="Male"
                        origin="English (US)"
                    />
                </div>
            </header>
            <main className="content-section">
                <TTSDataGrid />
            </main>
        </div>
    );
};

export default Home;
