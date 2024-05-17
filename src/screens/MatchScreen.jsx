import React, { useState } from "react";

import Scoreboard from "../components/Scoreboard";
import BreakCounter from "../components/BreakCounter";
import Ball from "../components/Ball";
import FoulMenu from "../components/FoulMenu";

import Arrow from "../images/player_arrow.svg"
import Red from "../images/red.svg";
import FoulBall from "../images/foul.svg";
import EndTurn from "../images/endturn.svg";
import Yellow from "../images/yellow.svg";
import Green from "../images/green.svg";
import Brown from "../images/brown.svg";
import Blue from "../images/blue.svg";
import Pink from "../images/pink.svg";
import Black from "../images/black.svg";

export default function Frame(props) {

    // Player info
    const [p1, setP1] = useState({
        name: props.p1, score: 0, active: true
    });
    const [p2, setP2] = useState({
        name: props.p2, score: 0, active: false
    });

    /*     const p1Name = p1.name.charAt(0).toUpperCase() + p1.name.slice(1);
        const p2Name = p2.name.charAt(0).toUpperCase() + p2.name.slice(1); */

    // Used to display player name in Foul menu etc
    const [activePlayer, setActivePlayer] = useState(p1.name);
    const [passivePlayer, setPassivePlayer] = useState(p2.name);

    // Info screen stuff
    const [redsLeft, setRedsLeft] = useState(props.reds);
    let pointsLeft = (redsLeft * 8) + 27; // Highest possible amount of points left on the table without fouls
    let pointDifference = (Math.abs(p1.score - p2.score)); // Difference between leading and trailing player

    const [breakCounter, setBreakCounter] = useState(0); // Counts points for current break. Updated after every pot

    const ballsArray = [{ Red }, { Yellow }, { Green }, { Brown }, { Blue }, { Pink }, { Black }]; // Used for the break counter

    const [currentBreak, setCurrentBreak] = useState([]);
    const updateCurrentBreak = (newValue) => {

    };

    const [turnInProgress, setTurnInProgress] = useState(false); // Set to true when a player pots a ball and false when their turn ends
    const [disableRed, setDisableRed] = useState(false); // Used to disable the red ball at the end of the frame
    const [redPottedPreviously, setRedPottedPreviously] = useState(false); // Used to determine frame progress when redsLeft reaches 0 

    // Control when the colors are available or not
    const [disableYellow, setDisableYellow] = useState(true);
    const [disableGreen, setDisableGreen] = useState(true);
    const [disableBrown, setDisableBrown] = useState(true);
    const [disableBlue, setDisableBlue] = useState(true);
    const [disablePink, setDisablePink] = useState(true);
    const [disableBlack, setDisableBlack] = useState(true);

    const enableColors = () => {
        setDisableYellow(false);
        setDisableGreen(false);
        setDisableBrown(false);
        setDisableBlue(false);
        setDisablePink(false);
        setDisableBlack(false);
    };

    const disableColors = () => {
        setDisableYellow(true);
        setDisableGreen(true);
        setDisableBrown(true);
        setDisableBlue(true);
        setDisablePink(true);
        setDisableBlack(true);
    };

    const toggleActivePlayer = () => {

        if (p1.active) {
            document.getElementById("p1Score").style.backgroundColor = "var(--green)";
            document.getElementById("p2Score").style.backgroundColor = "var(--lgreen)";
            setActivePlayer(p2.name);
            setPassivePlayer(p1.name);
        } else {
            document.getElementById("p1Score").style.backgroundColor = "var(--lgreen)";
            document.getElementById("p2Score").style.backgroundColor = "var(--green)";
            setActivePlayer(p1.name);
            setPassivePlayer(p2.name);
        };

        setP1(prevState => ({
            ...prevState, active: !prevState.active
        }));
        setP2(prevState => ({
            ...prevState, active: !prevState.active
        }));
    };

    const [noRedsLastPottedColor, setNoRedsLastPottedColor] = useState(1); // Used to control the active color after a foul when there's no reds left

    // Called when there are no more reds on the table. Value determines which ball(s) to (de)activate
    const noRedsLeft = (value) => {
        setRedPottedPreviously(false);
        disableColors();

        if (value === 1) {
            setDisableYellow(false);
        } else if (value === 2) {
            setDisableGreen(false);
        } else if (value === 3) {
            setDisableBrown(false);
        } else if (value === 4) {
            setDisableBlue(false);
        } else if (value === 5) {
            setDisablePink(false);
        } else if (value === 6) {
            setDisableBlack(false);
        } else if (value === 7) {
            // This should end Frame(); automatically
        }
        setNoRedsLastPottedColor(value);
    };

    const showBreakCounter = (value) => {
        const target = document.getElementById("breakCounter");
        if (value) {
            target.classList.add("break-counter-active");
        } else {
            target.classList.remove("break-counter-active");
        }
    };

    const potRed = () => {
        setTurnInProgress(true);
        setRedPottedPreviously(true);
        if (p1.active) {
            setP1(prevState => ({
                ...prevState, score: prevState.score + 1
            }));
        } else {
            setP2(prevState => ({
                ...prevState, score: prevState.score + 1
            }));
        };
        setRedsLeft(redsLeft - 1);
        if (redsLeft === 1) {
            setDisableRed(true);
        };
        setBreakCounter(breakCounter + 1);
        setCurrentBreak((array) => [...array, + 1]);
        enableColors();
        showBreakCounter(true);
    };

    const endTurn = () => {
        setTurnInProgress(false);
        setRedPottedPreviously(false);

        // Check what happens next
        if (redsLeft > 0) {
            disableColors();
        } else if (redPottedPreviously) {
            noRedsLeft(1);
        };
        toggleActivePlayer();
        setBreakCounter(0);
        setCurrentBreak([]);
        showBreakCounter(false);
    };

    // value & name are passed as parameters from the control buttons
    const potColor = (value, name) => {
        setTurnInProgress(true);
        setRedPottedPreviously(false);
        if (p1.active) {
            setP1(prevState => ({
                ...prevState, score: prevState.score + value
            }))
        } else {
            setP2(prevState => ({
                ...prevState, score: prevState.score + value
            }))
        }
        disableColors();
        if (redsLeft === 0 && redPottedPreviously) {
            noRedsLeft(1);
        } else if (redsLeft === 0 && redPottedPreviously === false) {
            noRedsLeft(value);
        } else {
            // Do nothing
        }
        setBreakCounter(breakCounter + value);
        setCurrentBreak((array) => [...array, + value]);
        showBreakCounter(true);
    };

    // Change active player by clicking their name/score on the scoreboard. Only available when no pots have been made (a turn is not in progress)
    const scoreboardClick = (value) => {
        if ((value === 1 && p1.active) || (value === 2 && p2.active)) {
            // Do nothing
        } else if (turnInProgress) {
            // Flash End turn button to guide the user
            const flashOverlay = document.getElementById("endturn-overlay").classList;
            flashOverlay.add("flash-animation");
            setTimeout(() => {
                flashOverlay.remove("flash-animation");
            }, 1000);
        } else {
            endTurn();
        }
    };

/*     const openFoulMenu = () => {
        setDisplay("foul");
    }; */

    const closeFoulMenu = () => {
        setDisplay("control");
    };

    const openFoulMenu = () => {
        document.getElementById("foul-menu").style.transform = "translateY(0%)";
    };

    // Foul menu
    function foulmens() {

        const dynamicFoulPoints = () => {
            if (noRedsLastPottedColor > 3) {
                return (
                    noRedsLastPottedColor + 1
                )
            } else {
                return (
                    4
                )
            }
        };

        const [fouls, setFouls] = useState(1); // Displays the amount of fouls in a row to help the user keep track
        const [foulPoints, setFoulPoints] = useState(dynamicFoulPoints);
        const [totalPointsConceded, setTotalPointsConceded] = useState(foulPoints); // Amount of points conceded from consecutive fouls


        const [disableDecrementCount, setDisableDecrementCount] = useState(true);
        const [disableIncrementCount, setDisableIncrementCount] = useState(false);

        const [foulMenuRedsLeft, setFoulMenuRedsLeft] = useState(redsLeft); // Updated when the foul menu is open and used to update redsLeft on the main app when the menu is closed

        const decrementCount = () => {
            if (foulPoints > 4) {
                setFoulPoints(foulPoints - 1);
                setTotalPointsConceded(totalPointsConceded - 1);
            }
            if (foulPoints === 5) {
                setDisableDecrementCount(true);
            }
            setDisableIncrementCount(false);
        };

        const incrementCount = () => {
            if (foulPoints < 7) {
                setFoulPoints(foulPoints + 1);
                setTotalPointsConceded(totalPointsConceded + 1);
            }
            if (foulPoints === 6) {
                setDisableIncrementCount(true);
            }
            setDisableDecrementCount(false);
        };

        const [redsRemoved, setRedsRemoved] = useState(0);

        const [disableDecrementReds, setDisableDecrementReds] = useState(true);
        const [disableIncrementReds, setDisableIncrementReds] = useState(false);

        const decrementRedsRemoved = () => {
            if (redsRemoved > 0) {
                setRedsRemoved(redsRemoved - 1);
            }

            if (redsRemoved === 1) {
                setDisableDecrementReds(true);
            }
            setDisableIncrementReds(false);
        };

        const incrementRedsRemoved = () => {
            if (redsRemoved < foulMenuRedsLeft) {
                setRedsRemoved(redsRemoved + 1);
            }
            setDisableDecrementReds(false);
            if (redsRemoved === foulMenuRedsLeft - 1) {
                setDisableIncrementReds(true);
            }
        };

        // Free ball for next turn:

        const [freeBall, setFreeBall] = useState(false);

        const [disableAddFoul, setDisableAddFoul] = useState(false);

        const freeBallNext = (e) => {
            if (e.target.checked) {
                setFreeBall(true);
                setDisableAddFoul(true);
            } else {
                setFreeBall(false);
                setDisableAddFoul(false);
            }
        };

        // Lets user add consecutive fouls without closing the foul menu in between
        const addFoul = () => {
            setTotalPointsConceded(totalPointsConceded + foulPoints);
            setFoulMenuRedsLeft(foulMenuRedsLeft - redsRemoved);
            setTotalPointsConceded(totalPointsConceded + foulPoints);
            setRedsRemoved(0);
            setFouls(fouls + 1);
        };

        // Ends the turn, closes the foul menu and adds the conceded points to the point tally in the main app
        const foulEndTurn = () => {
            setFoulMenuRedsLeft(foulMenuRedsLeft - redsRemoved);
            setRedsLeft(foulMenuRedsLeft - redsRemoved);
            if (p1.active) {
                setP2(prevState => ({
                    ...prevState, score: prevState.score + totalPointsConceded
                }))
                /* console.log(totalPointsConceded + " foul points awarded to " + p2.name); */
            } else {
                setP1(prevState => ({
                    ...prevState, score: prevState.score + totalPointsConceded
                }))
                /* console.log(totalPointsConceded + " foul points awarded to " + p1.name); */
            };
            /*             console.log("foulMenuRedsLeft - redsRemoved: " + (foulMenuRedsLeft - redsRemoved));
                        console.log("foulMenuRedsLeft :" + foulMenuRedsLeft);
                        console.log("redsRemoved :" + redsRemoved);
                        console.log("noRedsLastPottedColor :" + noRedsLastPottedColor); */
            if ((foulMenuRedsLeft - redsRemoved) === 0) {
                setDisableRed(true);
                noRedsLeft(noRedsLastPottedColor);
            };
            closeFoulMenu();
            toggleActivePlayer();
            //endTurn();
        };

        // Foul menu 
        return (
            <div id="foulMenu">
                <button id="close" onClick={() => closeFoulMenu()}><b>&#x2715;</b></button>
                <h3>FOUL BY {activePlayer.toUpperCase()}:</h3>
                <div>foulMenuRedsLeft: {foulMenuRedsLeft}</div>
                <div id="pointsForOpponent">
                    <label>Points for {passivePlayer}:</label>
                    <div className="formControls">
                        <button className="plusMinus" disabled={disableDecrementCount} onClick={decrementCount}>-</button>
                        <div className="displayValue">{foulPoints}</div>
                        <button className="plusMinus" disabled={disableIncrementCount} onClick={incrementCount}>+</button>
                    </div>
                </div>
                <div id="redsRemoved">
                    <label>Reds removed:</label>
                    <div className="formControls">
                        <button className="plusMinus" disabled={disableDecrementReds} onClick={decrementRedsRemoved}>-</button>
                        <span className="displayValue">{redsRemoved}</span>
                        <button className="plusMinus" disabled={disableIncrementReds} onClick={incrementRedsRemoved}>+</button>
                    </div>
                </div>
                <div id="freeBallNext">
                    <label htmlFor="freeBall">Free ball for next turn:</label>
                    <input type="checkbox" id="freeBall" onChange={freeBallNext} ></input>
                </div>
                <nobr>Fouls: {fouls}</nobr><br />
                <nobr className="totalPointsConceded">Total points conceded: <b>{totalPointsConceded}</b></nobr>
                <div id="foulButtonsArea">
                    <div className="buttonWrapper">
                        <button id="foulConfirm" className="foulButtons" onClick={() => foulEndTurn()}>Confirm</button>
                    </div>
                    <div>
                        <div id="or">or</div>
                    </div>
                    <div className="buttonWrapper">
                        <button id="addAnotherFoul" className="foulButtons" onClick={() => addFoul()}>+ Add another foul</button>
                    </div>
                </div>
            </div>
        )
    };

    return (
        <div>
            <FoulMenu activePlayer={activePlayer} passivePlayer={passivePlayer} redsLeft={redsLeft} toggleActivePlayer={toggleActivePlayer} />
            <Scoreboard arrow={Arrow} p1={p1} p2={p2} scoreboardClick={scoreboardClick} />

            <div className="control">
                <BreakCounter breakCounter={breakCounter} currentBreak={currentBreak} ballsArray={ballsArray} />

                <div id="firstRow" className="ball-row">
                    <Ball value={1} name={"red"} image={Red} disabled={disableRed} potColor={potRed} />
                    <div className="ball-wrapper">
                        <input type="image" src={FoulBall} id="foul" alt="foul" className="ball" onClick={() => openFoulMenu(redsLeft)} onContextMenu={(e) => e.preventDefault()} />
                        <input type="image" src={FoulBall} alt="foul" className="ball-bg" />
                    </div>
                    <div className="ball-wrapper">
                        <div id="endturn-overlay"></div>
                        <input type="image" src={EndTurn} id="endturn" alt="endturn" className="ball" onClick={endTurn} onContextMenu={(e) => e.preventDefault()} />
                        <input type="image" src={EndTurn} alt="endturn" className="ball-bg" />

                    </div>
                </div>

                <div id="colors">
                    <div id="baulkColors" className="ball-row">
                        <Ball value={2} name={"yellow"} image={Yellow} disabled={disableYellow} potColor={potColor} />
                        <Ball value={3} name={"green"} image={Green} disabled={disableGreen} potColor={potColor} />
                        <Ball value={4} name={"brown"} image={Brown} disabled={disableBrown} potColor={potColor} />
                    </div>

                    <div id="bigColors" className="ball-row">
                        <Ball value={5} name={"blue"} image={Blue} disabled={disableBlue} potColor={potColor} />
                        <Ball value={6} name={"pink"} image={Pink} disabled={disablePink} potColor={potColor} />
                        <Ball value={7} name={"black"} image={Black} disabled={disableBlack} potColor={potColor} />
                    </div>
                </div>

            </div>
        </div>

    );
};