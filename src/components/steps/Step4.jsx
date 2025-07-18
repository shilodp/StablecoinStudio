import { useState } from "react";
import "./Step4.css";

const countries = ["USA", "Canada", "UK", "Germany", "France", "Japan"];

function Step4({ data, updateField }) {
    const badges = data.badges || ["Default1", "Default2"]; // не удаляемые по условию
    const [inputValue, setInputValue] = useState("");
    const [dropdownVisible, setDropdownVisible] = useState(false);

    const addBadge = (country) => {
        if (!badges.includes(country)) {
            updateField("badges", [...badges, country]);
        }
        setDropdownVisible(false);
        setInputValue("");
    };

    const removeBadge = (badge) => {
        // не удаляем дефолтные
        if (["Default1", "Default2"].includes(badge)) return;

        updateField(
            "badges",
            badges.filter((b) => b !== badge)
        );
    };

    const filteredCountries = countries.filter(
        (c) =>
            c.toLowerCase().includes(inputValue.toLowerCase()) &&
            !badges.includes(c)
    );

    return (
        <div className="step4-container">
            <h2>Select Countries</h2>

            <div className="badges">
                {badges.map((badge) => (
                    <div
                        key={badge}
                        className={`badge ${
                            ["Default1", "Default2"].includes(badge)
                                ? "fixed"
                                : ""
                        }`}
                    >
                        {badge}
                        {!["Default1", "Default2"].includes(badge) && (
                            <button
                                type="button"
                                onClick={() => removeBadge(badge)}
                            >
                                ×
                            </button>
                        )}
                    </div>
                ))}
            </div>

            <input
                type="text"
                placeholder="Search country..."
                value={inputValue}
                onChange={(e) => {
                    setInputValue(e.target.value);
                    setDropdownVisible(true);
                }}
            />

            {dropdownVisible && filteredCountries.length > 0 && (
                <ul className="dropdown">
                    {filteredCountries.map((c) => (
                        <li key={c} onClick={() => addBadge(c)}>
                            {c}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default Step4;
