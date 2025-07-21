import React, { useState } from "react";
import AutocompleteSelect from "@components/FormElements/AutocompleteSelect/AutocompleteSelect.jsx";
import DropDownField from "@components/FormElements/DropDownField/DropDownField.jsx";
import "./BadgeInput.css";

function BadgeInput({
    value = [],
    locked,
    onChange,
    label,
    placeholder,
    tooltip,
    isRequired,
    inputType,
    dropdownOptions,
    autoCompleteOptions,
}) {
    const [inputShown, setInputShown] = useState(false);
    const [inputValue, setInputValue] = useState("");

    const handleAdd = () => {
        const trimmed = inputValue.trim();
        if (trimmed && !value.includes(trimmed)) {
            onChange([...value, trimmed]);
            setInputValue("");
            setInputShown(false);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            handleAdd();
        }
    };

    const handleRemove = (val) => {
        if (!locked.includes(val)) {
            onChange(value.filter((v) => v !== val));
        }
    };

    let inputElem;
    switch (inputType) {
        case "dropdown":
            inputElem = (
                <DropDownField
                    options={dropdownOptions.filter(
                        (item) => !value.includes(item.label)
                    )}
                    changeHandler={(newValue) => {
                        onChange([...value, newValue]);
                        setInputShown(false);
                    }}
                />
            );
            break;
        case "dropdownAutoComplete":
            inputElem = (
                <AutocompleteSelect
                    options={autoCompleteOptions.filter(
                        (item) => !value.includes(item)
                    )}
                    placeholder={placeholder}
                    onChange={(newValue) => {
                        onChange([...value, newValue]);
                        setInputShown(false);
                    }}
                />
            );
            break;
        case "text":
        default:
            inputElem = (
                <>
                    <input
                        type="text"
                        className="badge-input"
                        value={inputValue}
                        placeholder={placeholder}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyDown={handleKeyDown}
                    />
                    <button onClick={handleAdd}>Add</button>
                </>
            );
    }

    return (
        <div className="badge-input-wrapper">
            {label && (
                <label className="badge-label">
                    {label}
                    {isRequired && <span>*</span>}
                    {tooltip}
                </label>
            )}
            <div className="badge-list">
                {value.map((val) => (
                    <span
                        key={val}
                        className={`badge ${
                            locked.includes(val) ? "locked" : ""
                        }`}
                    >
                        {val}
                        {!locked.includes(val) && (
                            <button
                                className="remove-btn"
                                onClick={() => handleRemove(val)}
                            ></button>
                        )}
                    </span>
                ))}
            </div>
            <div className="add-button">
                <span>Add Item</span>
                <button
                    type="button"
                    onClick={() => {
                        setInputShown(true);
                    }}
                >
                    +
                </button>
            </div>
            {inputShown && <div className="input-wrapper">{inputElem}</div>}
        </div>
    );
}

export default BadgeInput;
