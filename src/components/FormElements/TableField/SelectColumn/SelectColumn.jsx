function SelectColumn({
    value = "",
    changeHandler,
    options = [],
    isUnique = false,
    currentValues = [],
}) {
    const valuesToShow = isUnique
        ? options.filter(
              (option) =>
                  option.value === value ||
                  !currentValues.includes(option.value)
          )
        : options;

    if (!value) {
        changeHandler(valuesToShow[0].value);
    }

    return (
        <select
            value={value || valuesToShow[0].value}
            onChange={(e) => changeHandler(e.target.value)}
            disabled={valuesToShow.length === 1}
            style={valuesToShow.length === 1 ? { backgroundImage: "none" } : {}}
        >
            {valuesToShow.map((option) => (
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
