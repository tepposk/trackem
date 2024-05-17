import { useState, useEffect } from "react";

import StartScreen from "./StartScreen";
import BallMenuButton from "../components/BallMenuButton";

import GrayBallButton from "../images/buttons/gray_ball_button.svg";

import Close from "../icons/close.svg";
import Info from "../icons/info_white.svg";

export default function StartMenu(props) {

    /*     useEffect(() => {
            setTimeout(() => {
                const target = document.getElementById("start-menu");
                target.style.transform = "translateX(0%)";
            }, 0);
        }, []); */

    const [playerNames, setPlayerNames] = useState({
        p1: "",
        p2: ""
    });

    const resetMenu = () => {
        // setTimeout to prevent the fields from changing instantly, timer is set to match the start menu animations
        setTimeout(() => {
            setPlayerNames({
                p1: "",
                p2: ""
            });
            setRedIndex(2);
            setDisableDecrementReds(false);
            setDisableIncrementReds(true);
        }, 200)

    };

    const closeStartMenu = () => {
        document.getElementById("start-menu").style.transform = "translateX(100%)";
        resetMenu();
        /* props.setDisplay("start-screen"); */
    };

    const redArray = [6, 10, 15]; // Amount of reds available when starting the frame
    const [redIndex, setRedIndex] = useState(2); // Used to cycle through redArray
    const [disableDecrementReds, setDisableDecrementReds] = useState(false);
    const [disableIncrementReds, setDisableIncrementReds] = useState(true);

    const decrementReds = () => {
        if (redIndex > 0) {
            setRedIndex(redIndex - 1);
            setDisableIncrementReds(false);
        }
        if (redIndex === 1) {
            setDisableDecrementReds(true);
        }
    };

    const incrementReds = () => {
        if (redIndex < 2) {
            setRedIndex(redIndex + 1);
            setDisableDecrementReds(false);
        }
        if (redIndex === 1) {
            setDisableIncrementReds(true);
        }
    };

    const changeName = (e) => {
        setPlayerNames({
            ...playerNames,
            [e.target.name]: e.target.value
        })
    };

    return (
        <div className="app-wrapper">
            {/* <StartScreen startMatch={props.startMatch} display={props.display} setDisplay={props.setDisplay} /> */}
            <div id="start-menu" className="menu">
                <div className="menu-section">
                    <div className="menu-row">
                        <h2>GAME RULES</h2>
                        <input type="image" src={Close} onClick={() => closeStartMenu()} className="close-icon" />
                    </div>
                </div>

                <div className="menu-section">
                    <h3>Players </h3>
                    <div className="menu-row">
                        <input type="text" id="p1" name="p1" className="value-text" autoCapitalize="words" placeholder="Player 1" maxLength="20" value={playerNames.p1} onChange={(e) => changeName(e)} />
                        <label>vs</label>
                        <input type="text" id="p2" name="p2" className="value-text" autoCapitalize="words" placeholder="Player 2" maxLength="20" value={playerNames.p2} onChange={(e) => changeName(e)} />
                    </div>
                </div>

                <div className="menu-section" popovertarget="info">
                    <h3>Frames<input type="image" src={Info} alt="" className="inline-icon" /></h3>
                </div>

                <div className="menu-section">
                    <h3>Amount of reds</h3>
                    <div className="calculator">
                        <input type="button" disabled={disableDecrementReds} onClick={decrementReds} value="-" />
                        <input type="number" length="2" className="value-numeric" value={redArray[redIndex]} />
                        <input type="button" disabled={disableIncrementReds} onClick={incrementReds} value="+" />
                    </div>
                </div>
                
                <div className="menu-section">
                    <BallMenuButton image={GrayBallButton} action={() => props.startMatch(playerNames, redArray[redIndex])} />
                </div>
            </div>
        </div>
    )
};