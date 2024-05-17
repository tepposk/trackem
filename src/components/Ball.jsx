export default function Ball(props) {
/*     const showScore = document.getElementById(props.value).classList;
    flashOverlay.add("flash-animation");
    setTimeout(() => {
        flashOverlay.remove("flash-animation");
    }, 1000); */

    const handleClick = () => {
        props.potColor(props.value, `${props.name}`);
        const animate = document.getElementById(`${props.name}-score`).classList;
        animate.add("pot-animation");
        setTimeout(() => {
            animate.remove("pot-animation");
        }, 1000);
    }

    return (
        <div className="ball-wrapper">
            <span id={`${props.name}-score`} className="ball-score"><span className="ball-score-small">+</span>{props.value}</span>
            <input type="image" src={props.image} disabled={props.disabled} id={`${props.name}`} alt={`${props.name}`} className="ball" onClick={() => handleClick()} onContextMenu={(e) => e.preventDefault()} />
            <input type="image" src={props.image} disabled={props.disabled} alt={`${props.name}`} className="ball-bg" />
        </div>
    )
};
