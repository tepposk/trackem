import React, { useState } from "react";

import BallMenuButton from "./BallMenuButton";

import Close from "../icons/close.svg";
import Checkmark from "../icons/checkmark.svg";
import Confirm from "../images/buttons/confirm_button.svg";


export default function FoulMenu(props) {

    // Points for opponent: 
    const [foulPoints, setFoulPoints] = useState(4);

    const [disableDecrementCount, setDisableDecrementCount] = useState(true);
    const [disableIncrementCount, setDisableIncrementCount] = useState(false);
    const [disableDecrementRedsRemoved, setDisableDecrementRedsRemoved] = useState(true);
    const [disableIncrementRedsRemoved, setDisableIncrementRedsRemoved] = useState(false);

    const decrementCount = (e) => {
        e.preventDefault();
        if (foulPoints > 4) {
            setFoulPoints(foulPoints - 1);
        }
        if (foulPoints === 5) {
            setDisableDecrementCount(true);
        }
        setDisableIncrementCount(false);
    };

    const incrementCount = (e) => {
        e.preventDefault();
        if (foulPoints < 7) {
            setFoulPoints(foulPoints + 1);
        }
        if (foulPoints === 6) {
            setDisableIncrementCount(true);
        }
        setDisableDecrementCount(false);
    };


    // Reds removed:
    const [redsRemoved, setRedsRemoved] = useState(0);
    const redsRemovedHidden = document.getElementsByClassName("remove-reds-hide");

    const showRemoveRedsDetails = () => {
        if (redsRemoved === 0) {
            setRedsRemoved(redsRemoved + 1);
            setDisableDecrementRedsRemoved(false);
            document.getElementById("test").style.color = "white";
            for (let i = 0; i < redsRemovedHidden.length; i++) {
                redsRemovedHidden[i].style.visibility = "visible";
            }
        }
    };

    const hideRemoveRedsDetails = () => {
        setRedsRemoved(0);
        setDisableDecrementRedsRemoved(true);
        document.getElementById("test").style.color = "var(--xdred)";
        for (let i = 0; i < redsRemovedHidden.length; i++) {
            redsRemovedHidden[i].style.visibility = "hidden";
        }
    };

    const decrementRedsRemoved = (e) => {
        e.preventDefault();
        setDisableIncrementRedsRemoved(false);
        if (redsRemoved > 0) {
            setRedsRemoved(redsRemoved - 1);
        }
        if (redsRemoved === 1) {
            hideRemoveRedsDetails();
        }
    };

    const incrementRedsRemoved = (e) => {
        e.preventDefault();
        setDisableDecrementRedsRemoved(false);
        if (redsRemoved < props.redsLeft) {
            setRedsRemoved(redsRemoved + 1);
        }
        if (props.redsLeft - redsRemoved === 1) {
            setDisableIncrementRedsRemoved(true);
        }
    }

    // Free ball for next turn:

    const [freeBall, setFreeBall] = useState(false);

    const toggleChecked = () => {
        const freeBallCheckmark = document.getElementById("free-ball-checkmark");
        setFreeBall(!freeBall);
        freeBallCheckmark.style.visibility = "visible";
        if (freeBall) {
            freeBallCheckmark.style.visibility = "hidden";
        }
    };

    const freeBallNext = (e) => {
        if (e.target.checked) {
            setFreeBall(true);
        } else {
            setFreeBall(false);
        }
        console.log(freeBall);
    };

    // Buttons for submit
    const handleSubmit = (e) => {
        e.preventDefault();
        //closeFoulMenu();
        props.foulEndTurn(foulPoints, redsRemoved, freeBall);
        resetMenu();
        // Placeholder until dynamic foul points are set back up
        setDisableDecrementCount(true);
        setDisableIncrementCount(false);
    }

    const resetMenu = () => {
        hideRemoveRedsDetails();
        setFoulPoints(4);
        setFreeBall(false);
        document.getElementById("free-ball-checkmark").style.visibility = "hidden";
    };

    const closeFoulMenu = () => {
        resetMenu();
        document.getElementById("foul-menu").style.transform = "translateY(-100%)";
    };


    return (
        <div id="foul-menu" className="menu">
            {/* <form onSubmit={handleSubmit}> */}
            <div className="menu-section">
                <div className="menu-row">
                    <h2>FOUL! <span className="no-bold">By</span> <span id="toggle-player" onClick={() => props.toggleActivePlayer()}>{props.activePlayer}</span></h2>
                    <input type="image" src={Close} onClick={() => closeFoulMenu()} className="close-icon" />
                </div>
            </div>

            {/*                 <div id="pointsForOpponent">
                    <label>Points for opponent: </label>
                    <button onClick={decrementCount}>-</button>
                    {foulPoints}
                    <button onClick={incrementCount}>+</button>
                </div> */}
            <div className="menu-section">
                <h3>Points for {props.passivePlayer}</h3>
                <div className="calculator">
                    <input type="button" disabled={disableDecrementCount} onClick={decrementCount} value="-" />
                    <input type="number" length="1" className="value-numeric" value={foulPoints} />
                    <input type="button" disabled={disableIncrementCount} onClick={incrementCount} value="+" />
                </div>
            </div>

            <div className="menu-section">
                <h3>Remove reds</h3>
                <div className="calculator">
                    <input type="button" disabled={disableDecrementRedsRemoved} onClick={decrementRedsRemoved} value="-" className="remove-reds-hide" />
                    <div className="remove-reds-wrapper" onClick={() => showRemoveRedsDetails()}>
                        <input type="number" length="2" className="value-numeric test" value={redsRemoved} id="test" />
                    </div>
                    <input type="button" disabled={disableIncrementRedsRemoved} onClick={incrementRedsRemoved} value="+" className="remove-reds-hide" />
                </div>

            </div>

            <div className="menu-section" >
                <h3>Free ball</h3>
                <div className="checkbox value-numeric" onClick={() => toggleChecked()}>
                    <input type="image" src={Checkmark} id="free-ball-checkmark" alt="" className="checkmark" />
                </div>
            </div>

            <div className="menu-section">
                <BallMenuButton image={Confirm} action={handleSubmit} />
            </div>
            {/* </form> */}
        </div>
    )
};