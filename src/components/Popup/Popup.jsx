import "./Popup.css";

function Popup({ title, text, clickHandler }) {
    return (
        <div className="popup-overlay" onClick={() => clickHandler(false)}>
            <div className="popup" onClick={(e) => e.stopPropagation()}>
                <div className="popup-header">
                    <h2>{title}</h2>
                </div>
                <div className="popup-body">{text}</div>
                <div className="popup-footer">
                    <button onClick={() => clickHandler(false)}>Close</button>
                </div>
            </div>
        </div>
    );
}

export default Popup;
