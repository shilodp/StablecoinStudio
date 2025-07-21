import React, { useState, useRef, useEffect } from "react";
import "./AutocompleteSelect.css";

function AutocompleteSelect({ options, onChange, placeholder }) {
    const [inputValue, setInputValue] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const ref = useRef();

    useEffect(() => {
        function handleClickOutside(e) {
            if (ref.current && !ref.current.contains(e.target)) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleSelect = (item) => {
        onChange(item);
        setInputValue("");
        setIsOpen(false);
    };

    const filteredOptions = options.filter((item) => {
        if (inputValue) {
            return item.toLowerCase().includes(inputValue.toLowerCase());
        }
        return true;
    });

    return (
        <div className="autocomplete-select" ref={ref}>
            <input
                type="text"
                value={inputValue}
                className="autocomplete-input"
                placeholder={placeholder}
                onChange={(e) => {
                    setInputValue(e.target.value);
                    setIsOpen(true);
                }}
                onFocus={() => setIsOpen(true)}
            />
            {isOpen && filteredOptions.length > 0 && (
                <ul className="autocomplete-dropdown">
                    {filteredOptions.map((item) => (
                        <li key={item} onClick={() => handleSelect(item)}>
                            {item}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default AutocompleteSelect;
