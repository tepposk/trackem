
export default function BallMenuButton(props) {

    return (
        <div className="ball-wrapper ball-button-wrapper">
            <input type="image" src={props.image} alt="" className="ball ball-button" onClick={props.action} onContextMenu={(e) => e.preventDefault()} />
            <input type="image" src={props.image} alt="" className="ball-bg" />
        </div>
    )
};