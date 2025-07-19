import { useState, useRef } from "react";
import "./DragnDropField.css";

function DragnDropField({
    label,
    text,
    accept,
    changeHandler,
    isMultiple,
    isRequired,
}) {
    const [dragOver, setDragOver] = useState(false);
    const [fileNames, setFileNames] = useState("");
    const fileInputRef = useRef();

    const handleDrop = (e) => {
        e.preventDefault();
        setDragOver(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            updateField("uploadedFile", e.dataTransfer.files[0]);
        }
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        setDragOver(true);
    };

    const handleDragLeave = () => {
        setDragOver(false);
    };

    const handleFileChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setFileNames(
                Array.from(e.target.files)
                    .map((file) => file.name)
                    .join(", ")
            );
            changeHandler(e.target.files);
        }
    };
    return (
        <div className="dnd-field">
            <p className="dnd-label">
                {label}
                {isRequired && <span>*</span>}
            </p>
            <div
                className={`dnd-container ${dragOver ? "drag-over" : ""}`}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onClick={() => fileInputRef.current.click()}
            >
                <p>{text}</p>
                <label className="button">Browse files</label>
                <input
                    style={{ display: "none" }}
                    ref={fileInputRef}
                    type="file"
                    accept={accept}
                    onChange={handleFileChange}
                    multiple={isMultiple}
                    required={isRequired}
                />
                {fileNames && <p>{fileNames}</p>}
            </div>
        </div>
    );
}

export default DragnDropField;
