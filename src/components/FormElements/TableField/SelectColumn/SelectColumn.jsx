function SelectColumn({ value, changeHandler, options }) {
    return (
        <select value={value} onChange={(e) => changeHandler(e.target.value)}>
            {options.map((option) => (
                <option
                    key={option.value}
                    value={option.value}
                    disabled={option.disabled}
                >
                    {option.label}
                </option>
            ))}
        </select>
    );
}

export default SelectColumn;
