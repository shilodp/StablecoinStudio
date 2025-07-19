import "./Tooltip.css";

function Tooltip({ text }) {
    return (
        <div className="tooltip-container">
            <span className="tooltip-icon">i</span>
            <div className="tooltip-text">{text}</div>
        </div>
    );
}

export default Tooltip;
