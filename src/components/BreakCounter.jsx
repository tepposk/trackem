export default function BreakCounter(props) {

    const ballsArray = [
        { value: 1, icon: props.ballsArray[0].Red, appears: false },
        { value: 2, icon: props.ballsArray[1].Yellow, appears: false },
        { value: 3, icon: props.ballsArray[2].Green, appears: false },
        { value: 4, icon: props.ballsArray[3].Brown, appears: false },
        { value: 5, icon: props.ballsArray[4].Blue, appears: false },
        { value: 6, icon: props.ballsArray[5].Pink, appears: false },
        { value: 7, icon: props.ballsArray[6].Black, appears: false },
    ];

    let ballsCount = [0, 0, 0, 0, 0, 0, 0];

    const ShowCurrentBreak = () => {
        const breakSorted = props.currentBreak.sort();

        for (let i = 0; i < ballsArray.length; i++) {
            let count = 0;
            for (let j = 0; j < breakSorted.length; j++) {
                if (ballsArray[i].value === breakSorted[j]) {
                    count++;
                    ballsArray[i].appears = true;
                }
            }
            ballsCount[i] = count;
        };

        return (
            <div className="break-list">
                {ballsArray.map(ball => {
                    if (ball.appears) {
                        return (
                            <span key={ball.value}>
                                {ballsCount[ball.value - 1]}
                                <input type="image" src={ball.icon} alt="" className="break-counter-ball" />
                            </span>
                        )
                    }
                })}
            </div>
        )
    }

    return (
        <div className="break-wrapper">
            <div id="breakCounter" className="break-counter">
                <span>Break:&nbsp;<b>{props.breakCounter}&nbsp;</b></span>
                <ShowCurrentBreak />
            </div>
        </div>
    )
};