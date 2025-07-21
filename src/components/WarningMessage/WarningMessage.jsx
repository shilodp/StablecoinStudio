import warningIcon from "@assets/warning.svg";
import "./WarningMessage.css";

function WarningMessage({ text }) {
    if (!text) return null;

    return (
        <div className="warning-message">
            <span className="warning-icon">
                <img src={warningIcon} />
            </span>
            <span className="warning-text">{text}</span>
        </div>
    );
}

export default WarningMessage;
