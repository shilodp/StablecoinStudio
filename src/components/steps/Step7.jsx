import { useState, useRef } from "react";
import "./Step7.css";

function Step7({ data, updateField }) {
    const [dragOver, setDragOver] = useState(false);
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
            updateField("uploadedFile", e.target.files[0]);
        }
    };

    return (
        <div
            className={`step7-container ${dragOver ? "drag-over" : ""}`}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onClick={() => fileInputRef.current.click()}
        >
            <p>
                {data.uploadedFile
                    ? data.uploadedFile.name
                    : "Drag & Drop file here or click to upload"}
            </p>
            <input
                ref={fileInputRef}
                type="file"
                style={{ display: "none" }}
                onChange={handleFileChange}
            />
        </div>
    );
}

export default Step7;
