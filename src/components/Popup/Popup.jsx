import "./Popup.css";

function Popup({ header, body, footer, closeHandler }) {
    return (
        <div className="popup-overlay" onClick={closeHandler}>
            <div className="popup" onClick={(e) => e.stopPropagation()}>
                <div className="popup-header">
                    {header}
                    <button
                        className="close-button"
                        onClick={closeHandler}
                    ></button>
                </div>
                <div className="popup-body">{body}</div>
                <div className="popup-footer">{footer}</div>
            </div>
        </div>
    );
}

export default Popup;
