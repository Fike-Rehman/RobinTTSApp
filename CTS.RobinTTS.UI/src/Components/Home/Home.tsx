
import "./Home.css"; // Import CSS file
import TTSDataGrid from "../TTSDataGrid/TTSDataGrid";
import robinLogo from '../../assets/Images/RobinLogo.svg';

const Home = () => {
    return (
        <div className="home-container">
            {/* Header Section */}
            <header className="header-section">
                {/* Left: Logo Container */}
                <div className="logo-container">
                    <img src={robinLogo} alt="Robin Logo" style={{ maxHeight: '200px', width: 'auto' }} ></img>
                </div>

                {/* Right: Voice Character Container */}
                <div className="voice-character-container">Voice Character</div>
            </header>

            {/* Content Section */}
            <main className="content-section">
                <TTSDataGrid />
            </main>
        </div>
    );
};

export default Home;
