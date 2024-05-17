export default function Scoreboard(props) {

    const maxFrames = 5;
    const frameWins = {
        p1: 10,
        p2: 2
    };

    return (
        <div className="scoreboard">
            <input type="image" src={props.arrow} className="player-arrow" id="p1-arrow" disabled={!props.p1.active} alt="" />
            <div id="p1Score" className="player-info" onClick={() => props.scoreboardClick(1)}><span className="player-score">{props.p1.score}</span>
                <div className="player-name">{props.p1.name}</div>
            </div>
            <div className="match-stats">
                <div id="p1-frame-wins" className="player-frame-wins">
                    {frameWins.p1}
                </div>
                <div className="max-frames">
                    {maxFrames}
                </div>
                <div id="p2-frame-wins" className="player-frame-wins">
                    {frameWins.p2}
                </div>
            </div>
            <input type="image" src={props.arrow} className="player-arrow" id="p2-arrow" disabled={!props.p2.active} alt="" />
            <div id="p2Score" className="player-info" onClick={() => props.scoreboardClick(2)}><span className="player-score">{props.p2.score}</span>
                <div className="player-name">{props.p2.name}</div>
            </div>
        </div>
    )
};