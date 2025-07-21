import InputColumn from "./InputColumn/InputColumn.jsx";
import SelectColumn from "./SelectColumn/SelectColumn.jsx";
import crossIcon from "@assets/cross.svg";
import "./TableField.css";

function TableField({
    label,
    columns,
    values,
    updateCell,
    addRow,
    removeRow,
    isRequired,
    tooltip,
}) {
    return (
        <div className={`table-field ${!updateCell && "disabled"}`}>
            <label className="table-label">
                {label}
                {isRequired && <span>*</span>}
                {tooltip}
            </label>
            <table>
                <thead>
                    <tr>
                        {columns.map((column) => (
                            <th key={column.name + "-title"}>
                                {column.label}
                                {column.tooltip}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {values.map((row, i) => (
                        <tr key={i}>
                            {columns.map((column) => {
                                let input;

                                switch (column.type) {
                                    case "text":
                                        input = (
                                            <InputColumn
                                                key={column.name + "-input"}
                                                type="text"
                                                value={row[column.name]}
                                                placeholder={column.placeholder}
                                                onChange={(e) =>
                                                    updateCell &&
                                                    updateCell(
                                                        i,
                                                        column.name,
                                                        e.target.value
                                                    )
                                                }
                                                disabled={!updateCell}
                                            />
                                        );
                                        break;
                                    case "number":
                                        input = (
                                            <InputColumn
                                                key={column.name + "-input"}
                                                type="number"
                                                value={row[column.name]}
                                                placeholder={column.placeholder}
                                                onChange={(e) =>
                                                    updateCell(
                                                        i,
                                                        column.name,
                                                        e.target.value
                                                    )
                                                }
                                                min={column.min}
                                                max={column.max}
                                                step={column.step}
                                            />
                                        );
                                        break;
                                    case "select":
                                        input = (
                                            <SelectColumn
                                                key={column.name + "-input"}
                                                value={row[column.name]}
                                                options={column.options}
                                                changeHandler={(value) => {
                                                    updateCell(
                                                        i,
                                                        column.name,
                                                        value
                                                    );
                                                }}
                                            />
                                        );
                                        break;
                                }

                                return (
                                    <td key={column.name + "-field"}>
                                        {input}
                                    </td>
                                );
                            })}
                            {i > 0 && removeRow && (
                                <td className="remove-cell">
                                    <button
                                        type="remove-button"
                                        onClick={() => removeRow(i)}
                                    >
                                        <img src={crossIcon} />
                                    </button>
                                </td>
                            )}
                        </tr>
                    ))}
                </tbody>
            </table>
            {addRow && (
                <div className="add-button">
                    <span>Add Row</span>
                    <button type="button" onClick={addRow}>
                        +
                    </button>
                </div>
            )}
        </div>
    );
}

export default TableField;
