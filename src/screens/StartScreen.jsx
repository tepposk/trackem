import StartMenu from "./StartMenu";
import BallMenuButton from "../components/BallMenuButton";

import TrackemLogo from "../images/trackem_logo.svg";
import SetGameRules from "../images/buttons/set_game_rules_button.svg";

const playerNames = {
    p1: "",
    p2: ""
};

const openStartMenu = () => {
    document.getElementById("start-menu").style.transform = "translateX(0%)";
};

export default function StartScreen(props) {
    return (
        <div className="start-screen">
            <StartMenu startMatch={props.startMatch} />
            <input type="image" src={TrackemLogo} alt="" className="logo" />
            <div className="start-screen-buttons">
                <BallMenuButton image={SetGameRules} action={() => openStartMenu()} />

                < button className="plain-text-button" onClick={() => props.startMatch(playerNames, 15)}>Play quick frame</button>
            </div>
        </div>
    )
};